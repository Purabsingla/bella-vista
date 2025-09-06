import React from "react";
import { Utensils } from "lucide-react";

interface LoaderProps {
  size?: "small" | "medium" | "large";
  text?: string;
  fullScreen?: boolean;
}

const Loading: React.FC<LoaderProps> = ({
  size = "medium",
  text = "Loading...",
  fullScreen = false,
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "w-8 h-8";
      case "large":
        return "w-16 h-16";
      default:
        return "w-12 h-12";
    }
  };

  const getTextSize = () => {
    switch (size) {
      case "small":
        return "text-sm";
      case "large":
        return "text-xl";
      default:
        return "text-lg";
    }
  };

  // const content = (
  //   <div className="flex flex-col items-center justify-center gap-4">
  //     {/* Animated Restaurant Icon */}
  //     <div className="relative">
  //       <div
  //         className={`${getSizeClasses()} bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center animate-pulse`}
  //       >
  //         <Utensils
  //           className={`${
  //             size === "small"
  //               ? "w-4 h-4"
  //               : size === "large"
  //               ? "w-8 h-8"
  //               : "w-6 h-6"
  //           } text-white animate-bounce`}
  //         />
  //       </div>

  //       {/* Rotating Ring */}
  //       <div
  //         className={`absolute inset-0 ${getSizeClasses()} border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin`}
  //       />

  //       {/* Outer Glow Ring */}
  //       <div
  //         className={`absolute inset-0 ${getSizeClasses()} border border-amber-400/20 rounded-full animate-ping`}
  //       />
  //     </div>

  //     {/* Loading Text */}
  //     <div className="text-center">
  //       <p className={`${getTextSize()} font-semibold text-white mb-1`}>
  //         {text}
  //       </p>
  //       <div className="flex items-center justify-center gap-1">
  //         <div
  //           className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"
  //           style={{ animationDelay: "0ms" }}
  //         />
  //         <div
  //           className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"
  //           style={{ animationDelay: "150ms" }}
  //         />
  //         <div
  //           className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"
  //           style={{ animationDelay: "300ms" }}
  //         />
  //       </div>
  //     </div>
  //   </div>
  // );

  // if (fullScreen) {
  //   return (
  //     <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center z-[9999]">
  //       {/* Animated Background */}
  //       <div className="absolute inset-0 overflow-hidden">
  //         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
  //         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000" />
  //       </div>

  //       <div className="relative z-10">{content}</div>
  //     </div>
  //   );
  // }

  // return <div className="flex items-center justify-center p-8">{content}</div>;

  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* Animated Restaurant Icon */}
      <div className="relative">
        <div
          className={`${getSizeClasses()} bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center animate-pulse`}
        >
          <Utensils
            className={`${
              size === "small"
                ? "w-4 h-4"
                : size === "large"
                ? "w-8 h-8"
                : "w-6 h-6"
            } text-white animate-bounce`}
          />
        </div>

        {/* Rotating Ring */}
        <div
          className={`absolute inset-0 ${getSizeClasses()} border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin`}
        />

        {/* Outer Glow Ring */}
        <div
          className={`absolute inset-0 ${getSizeClasses()} border border-amber-400/20 rounded-full animate-ping`}
        />
      </div>

      {/* Loading Text */}
      <div className="text-center">
        <p className={`${getTextSize()} font-semibold text-white mb-1`}>
          {text}
        </p>
        <div className="flex items-center justify-center gap-1">
          <div
            className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          />
          <div
            className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          />
          <div
            className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-[9999]">
        {/* Dimmed overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-95" />

        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000" />
        </div>

        {/* Loader Content */}
        <div className="relative z-10">{content}</div>
      </div>
    );
  }

  return <div className="flex items-center justify-center p-8">{content}</div>;
};

export default Loading;
