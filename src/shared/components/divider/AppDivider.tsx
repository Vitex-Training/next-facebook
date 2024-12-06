import { cn } from 'src/shared/utils/className';

export default function AppDivider({ className, ...other }: React.ComponentPropsWithoutRef<'div'>) {
  return <div className={cn('h-[1px] w-full bg-muted', className)} {...other} />;
}
