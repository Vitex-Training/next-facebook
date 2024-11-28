'use client';

import { onAuthStateChanged } from 'firebase/auth';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { auth } from 'src/shared/services/firebase/config';
import { ChildProps } from 'src/shared/types/general';

export default function RequiredAuth({ children }: ChildProps) {
  const router = useRouter();
  const user = auth.currentUser;
  const pathname = usePathname();

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) return;
      const url = pathname !== '/' ? `/login?redirectUrl=${pathname}` : '/login';
      router.push(url);
    });
    return () => {
      unSubscribe();
    };
  }, [pathname, router]);

  if (!user) return null;

  return children;
}
