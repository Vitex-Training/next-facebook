import { cva } from 'class-variance-authority';
import { ChildProps } from 'src/shared/types/general';

const form = cva(['rounded-lg', 'border', 'border-gray-300', 'bg-white-0', 'shadow-3xl']);
interface Props extends ChildProps {
  readonly className?: string;
  readonly htmlProps?: React.ComponentPropsWithoutRef<'form'>;
  readonly onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function FormWrapper({ children, className, onSubmit, ...htmlProps }: Props) {
  return (
    <form className={form({ className })} onSubmit={onSubmit} {...htmlProps}>
      {children}
    </form>
  );
}
