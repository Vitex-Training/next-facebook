import { cva } from 'class-variance-authority';

const form = cva(['rounded-lg', 'border', 'border-gray-300', 'bg-white-0', 'shadow-3xl']);
interface Props extends ChildProps {
  readonly className?: string;
  readonly onSubmit: () => void;
  readonly other?: any;
}

export default function FormWrapper({ children, className, onSubmit, ...other }: Props) {
  return (
    <form className={form({ className })} {...other} onSubmit={onSubmit}>
      {children}
    </form>
  );
}
