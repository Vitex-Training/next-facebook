import {
  AppTooltip,
  AppTooltipContent,
  AppTooltipProvider,
  AppTooltipTrigger,
} from 'src/shared/components/tooltip/AppTooltip';
import { ChildProps } from 'src/shared/types/general';

interface Props extends ChildProps {
  readonly tooltipContent: React.ReactNode;
}

export default function TooltipWrapper({ children, tooltipContent }: Props) {
  return (
    <AppTooltipProvider>
      <AppTooltip>
        <AppTooltipTrigger asChild>{children}</AppTooltipTrigger>
        <AppTooltipContent className='rounded-lg border-tooltip bg-tooltip text-white'>
          {tooltipContent}
        </AppTooltipContent>
      </AppTooltip>
    </AppTooltipProvider>
  );
}
