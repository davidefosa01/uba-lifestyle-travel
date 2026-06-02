import React from 'react';
import { cn } from '../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'flexpay';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant = 'primary',
  size = 'md',
  ...props
}) => {
  const variants = {
    primary: 'bg-uba-red text-white hover:bg-primary transition-colors shadow-sm active:scale-95 duration-150',
    secondary: 'bg-secondary text-white hover:bg-opacity-90',
    outline: 'border-1.5 border-on-surface text-on-surface hover:bg-surface-container-low',
    ghost: 'hover:bg-surface-container-low text-on-surface',
    flexpay: 'bg-gradient-to-r from-uba-red to-primary text-white shadow-lg active:scale-95 transition-transform font-bold'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-lg',
    md: 'px-4 py-2 rounded-xl',
    lg: 'px-6 py-3 text-lg rounded-xl',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-inter font-medium transition-all disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
};
