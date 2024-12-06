import React from 'react';
import { cn } from 'src/shared/utils/className';

const BadgeSticker = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('relative', className)} {...props} />
);
BadgeSticker.displayName = 'BadgeSticker';

interface BadgeStickerContentProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly anchorOrigin?: { horizontal: 'left' | 'right'; vertical: 'bottom' | 'top' };
}

const BadgeStickerContent = ({
  anchorOrigin = { horizontal: 'right', vertical: 'bottom' },
  className,
  ...props
}: BadgeStickerContentProps) => {
  const horizontalClass = {
    left: 'left-0',
    right: 'right-0',
  };
  const verticalClass = {
    bottom: 'bottom-0',
    top: 'top-0',
  };

  return (
    <div
      className={cn(
        'absolute z-[1]',
        horizontalClass[anchorOrigin.horizontal],
        verticalClass[anchorOrigin.vertical],
        className,
      )}
      {...props}
    />
  );
};
BadgeStickerContent.displayName = 'BadgeStickerContent';

export { BadgeSticker as AppBadgeSticker, BadgeStickerContent as AppBadgeStickerContent };
