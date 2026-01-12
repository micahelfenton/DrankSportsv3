
import React from 'react';
import { motion } from 'framer-motion';

// Explicitly adding common attributes to solve compiler errors where inheritance might fail in some environments
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  children?: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    'relative font-black uppercase tracking-wider rounded-2xl transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900';
  
  const variants = {
    primary:
      'bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_4px_0_rgb(55,48,163)] hover:shadow-[0_2px_0_rgb(55,48,163)] hover:translate-y-[2px] active:shadow-none active:translate-y-[4px] focus:ring-indigo-500',
    secondary:
      'bg-rose-600 hover:bg-rose-500 text-white shadow-[0_4px_0_rgb(159,18,57)] hover:shadow-[0_2px_0_rgb(159,18,57)] hover:translate-y-[2px] active:shadow-none active:translate-y-[4px] focus:ring-rose-500',
    success:
      'bg-emerald-500 hover:bg-emerald-400 text-white shadow-[0_4px_0_rgb(6,95,70)] hover:shadow-[0_2px_0_rgb(6,95,70)] hover:translate-y-[2px] active:shadow-none active:translate-y-[4px] focus:ring-emerald-500',
    ghost:
      'bg-transparent hover:bg-white/10 text-white shadow-none focus:ring-white/20',
    outline:
      'bg-transparent border-2 border-white/20 hover:bg-white/5 text-white shadow-none focus:ring-white/20',
  };

  const sizes = {
    sm: 'h-10 px-4 text-xs',
    md: 'h-12 px-6 text-sm',
    lg: 'h-14 px-8 text-base',
    xl: 'h-16 px-10 text-lg',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
