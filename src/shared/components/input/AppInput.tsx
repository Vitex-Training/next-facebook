import { cva, VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from 'src/shared/utils/className';

const inputVariants = cva(
  'flex w-full rounded-md border border-input-border  px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-input-placeholder focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 ',
  {
    defaultVariants: {
      variant: 'default',
    },
    variants: {
      variant: {
        default: 'bg-input text-input-foreground ',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      },
    },
  },
);

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, variant, ...props }, ref) => {
  return <input className={cn(inputVariants({ className, variant }))} ref={ref} type={type} {...props} />;
});
Input.displayName = 'Input';

export { Input as AppInput };
