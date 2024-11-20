'use client';

import { onAuthStateChanged } from 'firebase/auth';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { auth } from 'src/services/firebase';
import { ChildProps } from 'src/types/general';

export default function RequiredAuth({ children }: ChildProps) {
  const router = useRouter();
  const user = auth.currentUser;
  const pathname = usePathname();

  useEffect(() => {
    const unSubscriber = onAuthStateChanged(auth, (user) => {
      if (user) {
      } else {
        const url = pathname !== '/' ? `/login?redirectUrl=${pathname}` : '/login';
        router.push(url);
      }
    });
    return () => {
      unSubscriber();
    };
  }, []);

  if (user) {
    return <>{children}</>;
  } else {
    return <></>;
  }
}
