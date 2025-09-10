"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import SplitText from "@/components/SplitText/SplitText";
import FadeContent from "@/components/FadeContent";
import { EyeIcon, EyeOff, UserIcon, FolderCode, UserLock } from "lucide-react";
import { signIn, signUp } from "@/firebase/firebaseAuth";

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [rememberMe, setRememberMe] = useState(false);
  const { isLoading, showToast } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const from = searchParams.get("from") || "/";

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log("Input changed:", e.target.value);
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      // Clear error when user starts typing
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    },
    [errors]
  );

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = "Name is required";
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      if (!isLogin) {
        // SignUp using Firebase
        const userCred = await signUp(
          formData.name,
          formData.email,
          formData.password
        );
        if (userCred) {
          //passing token into head
          const token = await userCred.user.getIdToken();

          // Save extra info in Firestore via API route
          await fetch("/api/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              uid: userCred.user.uid,
              email: formData.email,
              name: formData.name,
              role: "user", // default
            }),
          });
          showToast("Account created successfully!", "success");
          router.replace(from);
        } else {
          showToast("ERROR.", "error");
        }
      } else {
        console.log("SignIn Works");
        console.log("Data is ", formData);

        // SignIn Using Firebase
        const userCredentials = await signIn(
          formData.email,
          formData.password,
          rememberMe
        );

        // Checking Success or not
        if (userCredentials) {
          showToast("Login successful!", "success");
          router.replace(from);
        }
      }
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  const memorizedSplitText = React.useMemo(
    () => (
      <SplitText
        key={isLogin ? "login" : "signup"}
        text={isLogin ? "Welcome Back!" : "Join Bella Vista"}
        className="text-3xl font-bold text-white mb-2"
        delay={100}
        duration={0.6}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0}
        rootMargin="0px 0px -20% 0px"
      />
    ),
    [isLogin]
  );

  const memorizedBackgroundAnimation = React.useMemo(
    () => (
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/30 via-purple-900/30 to-fuchsia-900/30" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-violet-400/30 to-purple-400/30 rounded-full mix-blend-multiply filter blur-2xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-fuchsia-400/30 to-pink-400/30 rounded-full mix-blend-multiply filter blur-2xl animate-pulse animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-400/30 to-violet-400/30 rounded-full mix-blend-multiply filter blur-2xl animate-pulse animation-delay-4000" />
      </div>
    ),
    []
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-16 relative overflow-hidden">
      {/* Stunning Background Animation */}
      {memorizedBackgroundAnimation}

      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full">
          <FadeContent>
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8">
              {/* Header */}
              <div className="text-center mb-8">
                {memorizedSplitText}

                <p className="text-gray-300">
                  {isLogin
                    ? "Sign in to your account to continue ordering"
                    : "Create an account to start your culinary journey"}
                </p>
              </div>

              {/* Toggle Buttons */}
              <div className="flex bg-white/5 rounded-xl p-1 mb-8">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`interactive flex-1 py-2 px-4 rounded-lg font-semibold transition-all duration-300 ${
                    isLogin
                      ? "bg-amber-600 text-white shadow-lg"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`interactive flex-1 py-2 px-4 rounded-lg font-semibold transition-all duration-300 ${
                    !isLogin
                      ? "bg-amber-600 text-white shadow-lg"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {!isLogin && (
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="interactive w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300"
                        placeholder="Enter your full name"
                      />
                    </div>
                    {errors.name && (
                      <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>
                )}

                <div>
                  <label className="block text-white font-medium mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <FolderCode className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="interactive w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300"
                      placeholder="Enter your email"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <UserLock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="interactive w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="interactive absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <EyeIcon className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                {isLogin && (
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="interactive w-4 h-4 text-amber-600 bg-white/10 border-white/20 rounded focus:ring-amber-400 focus:ring-2"
                    />
                    <label
                      htmlFor="rememberMe"
                      className="ml-2 text-gray-300 text-sm"
                    >
                      Remember me for 30 days
                    </label>
                  </div>
                )}

                {!isLogin && (
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <UserLock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="interactive w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300"
                        placeholder="Confirm your password"
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="interactive w-full bg-gradient-to-r from-amber-600 to-amber-500 text-white py-3 rounded-lg font-semibold text-lg hover:from-amber-500 hover:to-amber-400 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {isLogin ? "Signing In..." : "Creating Account..."}
                    </>
                  ) : (
                    <>{isLogin ? "🔐 Sign In" : "🎉 Create Account"}</>
                  )}
                </button>
              </form>

              {/* Footer */}
              <div className="mt-8 text-center">
                <p className="text-gray-400">
                  {isLogin
                    ? "Don't have an account? "
                    : "Already have an account? "}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="interactive text-amber-400 hover:text-amber-300 font-semibold transition-colors"
                  >
                    {isLogin ? "Sign up here" : "Sign in here"}
                  </button>
                </p>
              </div>
            </div>
          </FadeContent>
        </div>
      </div>
    </div>
  );
};

export default Auth;
