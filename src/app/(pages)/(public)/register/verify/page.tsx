'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { auth } from 'src/shared/services/firebase/config';

export default function VerifyRegister() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const checkVerificationStatus = async () => {
      const user = auth.currentUser;
      if (user) {
        await user.reload();
        if (user.emailVerified) {
          router.push('/login');
        }
      }
    };

    const interval = setInterval(checkVerificationStatus, 5000);

    return () => clearInterval(interval);
  }, [searchParams, router]);
  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='mx-auto max-w-xl rounded-lg bg-white-0 p-5'>
        <div>
          <h1 className='mb-2 text-2xl font-bold text-[#050505]'>Verification sent</h1>
          <p className='mb-2'>We sent a verify link to the email address that you provided, please check it out.</p>
        </div>
      </div>
    </div>
  );
}
