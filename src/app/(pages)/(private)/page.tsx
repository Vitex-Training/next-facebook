'use client';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { logout } from 'src/shared/services/firebase/auth/auth';
import { auth } from 'src/shared/services/firebase/config';

export default function Page() {
  const user = auth.currentUser;
  const mutation = useMutation({
    mutationFn: logout,
  });

  const onLogout = () => {
    mutation.mutate();
  };

  return (
    <div>
      <p>{user?.email}</p>
      <button onClick={onLogout}>Log out</button>
      <Link href='/reset-password'>Reset password</Link>
    </div>
  );
}
