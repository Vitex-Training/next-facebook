'use client';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from 'src/shared/components/button/Button';
import { findUserInStoreByEmail } from 'src/shared/services/firebase/user/findUserByEmail';

import { LoginBar } from './components/LoginBar';
export default function Page() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: findUserInStoreByEmail,
    onError: (err) => {
      setError(err);
    },
    onSuccess: (user) => {
      if (user) router.push(`/forgot/web?email=${user.email}&name=${user.firstName}`);
      else setError(new Error(`Cannot find user with email ${email}`));
    },
  });

  const handleFindUser = () => {
    mutation.mutate(email);
  };
  return (
    <div>
      <LoginBar />
      <div className='flex justify-center bg-slate-200 py-[80px]'>
        <div className='flex max-w-[500px] flex-col gap-2 rounded-md bg-white p-3 shadow-md'>
          <h2 className='border-b border-gray-200 pb-2 text-xl font-semibold'>Find Your Account</h2>
          <p className='text-sm'>Please enter your email address or mobile number to search for your account.</p>
          <form className='flex flex-col gap-4'>
            <input
              className='rounded-md border border-gray-200 p-2'
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email address or mobile number'
              type='email'
              value={email}
            />
            {!error || <small style={{ color: 'red' }}>{error.message}</small>}
            <div className='ml-auto flex gap-2'>
              <Button asChild className='bg-gray-200 text-black' type='button'>
                <Link href='/login'>Cancel</Link>
              </Button>
              <Button className='bg-blue-600 text-white' onClick={handleFindUser} type='button'>
                Search
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
