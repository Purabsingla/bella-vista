import React from "react";
import { CheckCircleIcon, X } from "lucide-react";

interface ToastProps {
  message: string;
  type: "success" | "error" | "info";
  isVisible: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, isVisible, onClose }) => {
  const getToastStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-500/90 border-green-400/50 text-white";
      case "error":
        return "bg-red-500/90 border-red-400/50 text-white";
      case "info":
        return "bg-blue-500/90 border-blue-400/50 text-white";
      default:
        return "bg-gray-500/90 border-gray-400/50 text-white";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircleIcon className="w-5 h-5" />;
      case "error":
        return <X className="w-5 h-5" />;
      default:
        return <CheckCircleIcon className="w-5 h-5" />;
    }
  };

  return (
    <div
      className={`fixed top-20 right-4 z-50 transform transition-all duration-500 ease-out ${
        isVisible
          ? "translate-x-0 opacity-100 scale-100"
          : "translate-x-full opacity-0 scale-95"
      }`}
    >
      <div
        className={`${getToastStyles()} backdrop-blur-lg border rounded-lg shadow-2xl p-4 max-w-sm`}
      >
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">{getIcon()}</div>
          <div className="flex-1">
            <p className="font-medium">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="interactive flex-shrink-0 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;
