import React from "react";

export default function PastelButton({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`
        bg-pink-200 hover:bg-pink-300 text-pink-800 font-semibold 
        px-4 py-2 rounded-full shadow-sm transition 
        focus:outline-none focus:ring-2 focus:ring-pink-400 
        ${className}
      `}
    >
      {children}
    </button>
  );
}