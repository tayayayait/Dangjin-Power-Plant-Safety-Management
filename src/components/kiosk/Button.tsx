import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming shadcn util is present

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'icon-only';
export type ButtonSize = 'lg' | 'md' | 'sm';
export type ButtonState = 'default' | 'hover' | 'active' | 'focus' | 'disabled' | 'loading' | 'error';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  isError?: boolean;
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'lg', isLoading, isError, icon, children, disabled, ...props }, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-primary/50 touch-ripple";
    
    const variants: Record<ButtonVariant, string> = {
      primary: "bg-primary text-primary-foreground border-none hover:brightness-110 active:bg-primary-dark",
      secondary: "bg-transparent text-primary border-2 border-primary hover:bg-primary-light active:bg-primary/20",
      danger: "bg-danger text-primary-foreground border-none hover:brightness-110 active:bg-danger/80",
      ghost: "bg-transparent text-gray-700 border-none hover:bg-gray-100 active:bg-gray-200",
      'icon-only': "bg-transparent text-gray-700 border-none hover:bg-gray-100 active:bg-gray-200 rounded-full",
    };

    const sizes: Record<ButtonSize, string> = {
      lg: variant === 'icon-only' ? "w-16 h-16" : "h-[64px] px-8 text-button rounded-md",
      md: variant === 'icon-only' ? "w-12 h-12" : "h-[52px] px-6 text-body rounded-md",
      sm: variant === 'icon-only' ? "w-10 h-10" : "h-[40px] px-4 text-body-sm rounded-md",
    };

    const states = cn(
      disabled && "bg-gray-100 text-gray-500 border-gray-300 opacity-60 pointer-events-none",
      isLoading && "pointer-events-none",
      isError && "border-2 border-danger animate-[shake_300ms_ease-in-out]"
    );

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], states, className)}
        {...props}
      >
        {isLoading ? (
          <Loader2 className={cn("animate-spin", size === 'lg' ? "w-7 h-7" : size === 'md' ? "w-6 h-6" : "w-5 h-5")} />
        ) : (
          <span className="flex items-center justify-center gap-2">
            {icon && <span className={cn(variant !== 'icon-only' && "mr-1")}>{icon}</span>}
            {variant !== 'icon-only' && children}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
