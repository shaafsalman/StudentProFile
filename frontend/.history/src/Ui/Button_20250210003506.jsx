import React from 'react';
import { Loader2 } from 'lucide-react';

const variants = {
  primary: 'bg-accent hover:bg-accent/60 text-white shadow-sm hover:shadow-md',
  secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-200',
  outline: 'border-2 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-700 dark:text-slate-200',
  ghost: 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200',
  danger: 'bg-red-600 hover:bg-red-700 text-white'
};

const sizes = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3 text-lg'
};

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon: Icon,
  iconPosition = 'left',
  isLoading = false,
  disabled = false,
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:transform-none';
  const variantStyles = variants[variant];
  const sizeStyles = sizes[size];
  const widthStyles = fullWidth ? 'w-full' : '';
  
  return (
    <button
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${widthStyles} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <Loader2 className="w-4 h-4 animate-spin" />
      )}
      {!isLoading && Icon && iconPosition === 'left' && (
        <Icon className="w-4 h-4" />
      )}
      {children}
      {!isLoading && Icon && iconPosition === 'right' && (
        <Icon className="w-4 h-4" />
      )}
    </button>
  );
};

export default Button;