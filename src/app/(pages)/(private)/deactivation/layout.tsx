export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className='flex min-h-screen items-center bg-slate-400'>{children}</div>;
}
