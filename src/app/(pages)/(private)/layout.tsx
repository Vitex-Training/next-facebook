import { ChildProps } from 'src/types/general';

import RequiredAuth from './components/RequiredAuth';

export default function Layout({ children }: ChildProps) {
  return <RequiredAuth>{children}</RequiredAuth>;
}
