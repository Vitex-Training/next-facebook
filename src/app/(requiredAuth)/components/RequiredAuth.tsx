'use client';

import { onAuthStateChanged } from 'firebase/auth';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { auth } from 'services/firebase';

export default function RequiredAuth({ children }: ChildProps) {
  const router = useRouter();
  const user = auth.currentUser;
  const pathname = usePathname();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
      } else {
        const url = pathname !== '/' ? `/login?redirectUrl=${pathname}` : '/login';
        router.push(url);
      }
    });
  }, []);

  if (user) {
    return <>{children}</>;
  } else {
    return <></>;
  }
}
