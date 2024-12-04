import React, { ReactElement } from 'react';
import { cn } from 'src/shared/utils/className';

interface Props extends React.ComponentPropsWithoutRef<'div'> {
  readonly anchorOrigin?: { horizontal?: 'left' | 'right'; vertical?: 'bottom' | 'top' };
  readonly bargeComp: ReactElement;
}

export default function WithBarge({
  anchorOrigin = { horizontal: 'right', vertical: 'top' },
  bargeComp,
  children,
  className,
  ...other
}: Props) {
  const BargeComp = bargeComp;
  const classVertical = `${anchorOrigin.vertical}-0`;
  const classHorizontal = `${anchorOrigin.horizontal}-0`;
  return (
    <div className={cn('relative', className)} {...other}>
      {children}
      <div
        className={cn(
          'absolute right-0 rounded-full border-2 border-white bg-lightgray',
          classVertical,
          classHorizontal,
        )}>
        {BargeComp}
      </div>
    </div>
  );
}
