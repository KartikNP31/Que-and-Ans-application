import React from "react";
import { Toaster } from "react-hot-toast";

const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        success: {
          style: {
            background: "white",
            border: "1px solid #4ade80",
            color: "#16a34a",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
          },
          iconTheme: {
            primary: "#16a34a",
            secondary: "#ffffff",
          },
        },
        error: {
          style: {
            background: "white",
            border: "1px solid #dc2626",
            color: "#dc2626",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
          },
          iconTheme: {
            primary: "#dc2626",
            secondary: "#ffffff",
          },
        },
        style: {
          background: "white",
          border: "1px solid #3b82f6",
          color: "#1e40af",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
        },
      }}
    />
  );
};

export default ToastProvider;
