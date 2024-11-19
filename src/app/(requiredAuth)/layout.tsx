import RequiredAuth from './components/RequiredAuth';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RequiredAuth>{children}</RequiredAuth>;
}
