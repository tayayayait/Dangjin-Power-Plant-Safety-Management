import React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';
import { InputProps } from './Input';

export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'disabled'> {
  label?: string;
  isError?: boolean;
  errorMessage?: string;
  isLoading?: boolean;
  disabled?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
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
          <textarea
            ref={ref}
            id={id}
            disabled={disabled || isLoading}
            className={cn(
              "w-full min-h-[120px] max-h-[300px] p-4 text-body rounded-md border-2 border-gray-300 bg-white transition-all duration-200 outline-none resize-none",
              "hover:border-gray-500",
              "focus:border-primary focus:shadow-inner",
              disabled && "bg-gray-100 border-gray-300 opacity-60 text-gray-500",
              isError && "border-danger focus:border-danger text-danger",
              className
            )}
            {...props}
          />
          {isError && (
            <div className="absolute right-4 top-4">
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

Textarea.displayName = 'Textarea';
