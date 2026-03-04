import React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';

export type InputState = 'default' | 'hover' | 'active' | 'focus' | 'disabled' | 'loading' | 'error';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  isError?: boolean;
  errorMessage?: string;
  isLoading?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, isError, errorMessage, isLoading, disabled, id, ...props }, ref) => {
    
    return (
      <div className="flex flex-col gap-2 relative">
        {label && (
          <label 
            htmlFor={id} 
            className={cn("text-body-sm font-semibold", isError ? "text-danger" : "text-gray-700")}
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            id={id}
            disabled={disabled || isLoading}
            className={cn(
              "w-full h-[56px] px-4 text-body rounded-md border-2 border-gray-300 bg-white transition-all duration-200 outline-none",
              "hover:border-gray-500",
              "focus:border-primary focus:shadow-inner",
              disabled && "bg-gray-100 border-gray-300 opacity-60 text-gray-500",
              isError && "border-danger focus:border-danger text-danger",
              className
            )}
            {...props}
          />
          {isError && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <AlertCircle className="w-5 h-5 text-danger" />
            </div>
          )}
        </div>
        {isError && errorMessage && (
          <p className="text-caption text-danger mt-1">{errorMessage}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
