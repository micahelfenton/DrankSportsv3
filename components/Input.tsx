
import React from 'react';

// Explicitly adding common attributes to solve compiler errors
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
  placeholder?: string;
  value?: string | number | readonly string[];
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="w-full space-y-2">
      {label && (
        <label className="block text-xs font-bold uppercase tracking-wider text-indigo-200 ml-1">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          className={`w-full bg-slate-800/80 border-2 border-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-4 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200 font-medium ${error ? 'border-rose-500' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-rose-400 text-xs ml-1">{error}</p>}
    </div>
  );
}
