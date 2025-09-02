// src/firebase/auth.js
import { auth } from "./firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  updateProfile,
} from "firebase/auth";

// Expiry time
const SESSION_EXPIRY = 60 * 60 * 1000;

// Save / update login timestamp
export const refreshLoginTime = () => {
  localStorage.setItem("auth_login_time", Date.now().toString());
};

// Sign up new user
export const signUp = async (
  name: string,
  email: string,
  password: string
): Promise<UserCredential> => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  await updateProfile(userCredential.user, { displayName: name });
  return userCredential;
};

// Sign in existing user with Remember Me + Expiry
export const signIn = async (
  email: string,
  password: string,
  rememberMe: boolean
): Promise<UserCredential> => {
  // 1️⃣ Set persistence based on rememberMe
  await setPersistence(
    auth,
    rememberMe ? browserLocalPersistence : browserSessionPersistence
  );

  // 2️⃣ Sign in user
  const userCred = await signInWithEmailAndPassword(auth, email, password);

  // 3️⃣ Store login timestamp for expiry check
  localStorage.setItem("auth_login_time", Date.now().toString());

  return userCred;
};

// Check if session expired
export const checkAuthExpiry = () => {
  const loginTime = localStorage.getItem("auth_login_time");
  if (!loginTime) return false;

  const now = Date.now();
  const diff = now - parseInt(loginTime);

  // Expired?
  if (diff > SESSION_EXPIRY) {
    logOut(); // auto logout
    return true;
  }
  return false;
};

// Sign out user
export const logOut = async (): Promise<void> => {
  return await signOut(auth);
};
