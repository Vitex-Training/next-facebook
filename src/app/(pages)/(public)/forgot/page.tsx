'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from 'src/shared/components/button/Button';
import { User, UserError } from 'src/shared/types/userForgot';

import { LoginBar } from './components/LoginBar';
export default function Page() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<null | UserError>(null);
  const router = useRouter();
  const handleFindUser = () => {
    setError(null);
    fetch('/api/find-user', {
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }).then((res) => {
      if (res.status !== 200) {
        res.json().then((err: UserError) => {
          setError(err);
        });
      } else {
        res.json().then((res: { user: User }) => {
          // change the name prop after it is saved when a user was created
          router.push(`/forgot/web?email=${res.user.email}&name=${res.user.firstname}`);
        });
      }
    });
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
              placeholder='Email address or mobile number'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {!error || <small style={{ color: 'red' }}>{error.error}</small>}
            <div className='ml-auto flex gap-2'>
              <Button asChild className='bg-gray-200 text-black' type='button'>
                <Link href='/login'>Cancel</Link>
              </Button>
              <Button className='bg-blue-600 text-white' type='button' onClick={handleFindUser}>
                Search
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
