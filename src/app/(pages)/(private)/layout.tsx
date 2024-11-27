import { ChildProps } from 'src/shared/types/general';

import RequiredAuth from './components/RequiredAuth';

export default function Layout({ children }: ChildProps) {
  return <RequiredAuth>{children}</RequiredAuth>;
}
