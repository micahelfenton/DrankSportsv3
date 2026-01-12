
import React from 'react';
import { ChevronDown } from 'lucide-react';

interface Option {
  value: string;
  label: string;
  icon?: string;
}

// Explicitly adding common attributes to solve compiler errors
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
  className?: string;
  value?: string | number | readonly string[];
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}

export function Select({ label, options, className = '', ...props }: SelectProps) {
  return (
    <div className="w-full space-y-2">
      {label && (
        <label className="block text-xs font-bold uppercase tracking-wider text-indigo-200 ml-1">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          className={`w-full appearance-none bg-slate-800/80 border-2 border-slate-700 text-white rounded-xl px-4 py-4 pr-10 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200 font-medium cursor-pointer ${className}`}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.icon} {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-400">
          <ChevronDown className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
