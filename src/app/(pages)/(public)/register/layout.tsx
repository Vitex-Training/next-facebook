export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className='flex flex-col items-center justify-center bg-[#f0f2f5] text-center'>{children}</div>;
}
