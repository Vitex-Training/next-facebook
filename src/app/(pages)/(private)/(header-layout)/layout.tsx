import Header from 'src/shared/layout/header/Header';
import { ChildProps } from 'src/shared/types/general';

export default function HeaderLayout({ children }: ChildProps) {
  return (
    <main>
      <Header />
      {children}
    </main>
  );
}
