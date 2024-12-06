'use client';
import Link from 'next/link';
import { auth } from 'src/shared/services/firebase/config';

export default function Page() {
  const user = auth.currentUser;

  return (
    <section>
      <p>{user?.email}</p>
      <Link href='/reset-password'>Reset password</Link>
    </section>
  );
}
