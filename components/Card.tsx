
import React from 'react';

export interface CardProps {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

export function Card({ children, className = '', title, subtitle }: CardProps) {
  return (
    <div className={`bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-xl ${className}`}>
      {(title || subtitle) && (
        <div className="mb-6 text-center">
          {subtitle && (
            <p className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-1">
              {subtitle}
            </p>
          )}
          {title && (
            <h2 className="text-3xl font-black italic tracking-wide text-white text-shadow">
              {title}
            </h2>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
