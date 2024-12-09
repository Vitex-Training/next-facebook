'use client';

import { onAuthStateChanged } from 'firebase/auth';
import { useAtom } from 'jotai';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { auth } from 'src/shared/services/firebase/config';
import { getUserInfoByUid } from 'src/shared/services/firebase/user/getUserInfoByUid';
import { currentUserAtom } from 'src/shared/states/auth';
import { ChildProps } from 'src/shared/types/general';

export default function RequiredAuth({ children }: ChildProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        const userInfo = await getUserInfoByUid(uid);
        setCurrentUser(userInfo);
        return;
      }
      const url = pathname !== '/' ? `/login?redirectUrl=${pathname}` : '/login';
      router.push(url);
    });
    return () => {
      unSubscribe();
    };
  }, [setCurrentUser, pathname, router]);

  if (!currentUser) return null;

  return children;
}
