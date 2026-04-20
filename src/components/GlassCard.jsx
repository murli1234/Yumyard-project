import React from 'react';

const GlassCard = ({ children, className = "" }) => {
  return (
    <div className={`glass-card rounded-[2.5rem] p-6 ${className}`}>
      {children}
    </div>
  );
};

export default GlassCard;
