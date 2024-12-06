import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from 'src/shared/utils/className';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
    variants: {
      size: {
        default: 'text-up-sm font-semibold h-9 px-4 py-2',
        icon: 'size-10 rounded-full',
        lg: 'text-xl font-bold h-12 rounded-md px-4',
        md: 'text-base  h-11  px-5',
        sm: 'h-8 rounded-md px-3',
        ['small-icon']: 'size-8 rounded-full ',
      },
      variant: {
        cancel: 'bg-cancel text-cancel-foreground ',
        default: 'bg-primary text-primary-foreground hover:bg-primary-accent disabled:bg-primary-disable ',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        icon: 'bg-icon text-icon-foreground hover:bg-icon-accent',

        link: 'text-primary underline-offset-4 hover:underline',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary-accent',
        ['small-icon']: 'text-small-icon-foreground hover:bg-small-icon-accent',
      },
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  readonly asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild = false, className, size, variant, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp className={cn(buttonVariants({ className, size, variant }))} ref={ref} {...props} />;
  },
);
Button.displayName = 'Button';

export { Button as AppButton, buttonVariants };
