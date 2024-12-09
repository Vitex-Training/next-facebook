import { ChildProps } from 'src/shared/types/general';

export default function Layout({ children }: ChildProps) {
  return <div className='flex flex-col items-center justify-center bg-[#f0f2f5] text-center'>{children}</div>;
}
