import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', ...props }, ref) => {
        const baseClasses = 'inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2';
        
        const variantClasses = {
            primary: 'text-white bg-primary-600 hover:bg-primary-700 focus:ring-primary-500',
            secondary: 'text-primary-700 bg-primary-100 hover:bg-primary-200 focus:ring-primary-500',
            ghost: 'text-slate-700 hover:bg-slate-100 focus:ring-primary-500',
        };

        return (
            <button
                ref={ref}
                className={cn(baseClasses, variantClasses[variant], className)}
                {...props}
            />
        );
    }
);

Button.displayName = 'Button';

export { Button };
