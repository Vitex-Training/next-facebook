import { Command as CommandPrimitive } from 'cmdk';
import { Search } from 'lucide-react';
import { cn } from 'src/shared/utils/className';

import { AppCommandInput } from './AppCommand';

interface Props extends React.ComponentPropsWithoutRef<'div'> {
  readonly inputProps?: React.ComponentProps<typeof CommandPrimitive.Input>;
}

export default function SearchCommandInput({ className, inputProps, ...props }: Props) {
  return (
    <div className={cn('flex items-center rounded-full bg-lightgray px-2', className)} {...props}>
      <Search size={16} />
      <AppCommandInput {...inputProps} />
    </div>
  );
}
