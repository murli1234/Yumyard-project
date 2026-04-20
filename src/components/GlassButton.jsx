import React from 'react';

const GlassButton = ({ children, onClick, className = "", variant = "primary", disabled = false, type = "button" }) => {
  const variants = {
    primary: "bg-yellow-500/10 border-yellow-500/20 hover:bg-yellow-500/20 text-yellow-500",
    secondary: "bg-white/5 border-white/10 hover:bg-white/10 text-slate-200",
    danger: "bg-red-500/10 border-red-500/20 hover:bg-red-500/20 text-red-500",
    solid: "bg-yellow-500 text-black border-yellow-500 hover:bg-yellow-400 font-black",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`glass-button px-6 py-3 rounded-2xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed border ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default GlassButton;
