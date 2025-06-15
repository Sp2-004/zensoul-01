import React from "react";

export default function CalmCard({ children, className = "" }) {
  return (
    <div
      className={`
        bg-white rounded-2xl shadow-lg p-6
        border border-pink-100 ${className}
      `}
    >
      {children}
    </div>
  );
}