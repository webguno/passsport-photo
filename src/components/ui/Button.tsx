import React from 'react';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
          {
            'bg-[#2563EB] text-white hover:bg-[#1D4ED8] shadow-sm': variant === 'primary',
            'bg-[#1E293B] text-white hover:bg-[#0F172A] shadow-sm': variant === 'secondary',
            'border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] text-[#1E293B] shadow-sm': variant === 'outline',
            'bg-transparent hover:bg-[#F1F5F9] text-[#64748B]': variant === 'ghost',
            'px-3 py-1.5 text-xs': size === 'sm',
            'px-4 py-2 text-sm': size === 'md',
            'px-5 py-2.5 text-base': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
