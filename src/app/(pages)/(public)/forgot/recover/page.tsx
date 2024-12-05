'use client';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Button } from 'src/shared/components/button/Button';
import { RadioGroup, RadioGroupItem } from 'src/shared/components/radio-group/RadioGroup';
import { resetPasswordViaEmail } from 'src/shared/services/firebase/user/resetPasswordViaEmail';

import { LoginBar } from '../components/LoginBar';

export default function Page() {
  const [selectedOption, setSelectedOption] = useState(''); // Track selected option
  const router = useRouter();
  const searchParams = useSearchParams();
  const email: string = searchParams?.get('email') || '';
  const name: string = searchParams?.get('name') || '';

  const mutation = useMutation({
    mutationFn: resetPasswordViaEmail,
    onError: (err) => {
      alert(err.message);
    },
    onSuccess: ({ email }) => {
      alert(`Send reset password to email ${email} successfully`);
    },
  });

  const sendForgotpasswordEmail = async () => {
    mutation.mutate(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form behavior

    if (!selectedOption) {
      alert('Please select an option!');
      return;
    }

    // Redirect based on selected option
    switch (selectedOption) {
      case 'email-code':
        sendForgotpasswordEmail();
        break;
      case 'enter-password':
        router.push(`/forgot/web?email=${email}&name=${name}`);
        break;
      case 'google-account':
        router.push('https://accounts.google.com');
        break;
      default:
        alert('Invalid selection');
    }
  };

  return (
    <div>
      <LoginBar />
      <div className='flex justify-center bg-slate-200 py-[80px]'>
        <div className='flex w-[500px] flex-col justify-center gap-x-2 rounded-sm bg-white px-3 py-[20px] shadow-md'>
          <h2 className='border-b border-gray-200 pb-[15px] text-[20px] font-bold'>Reset your password</h2>
          <div className='flex flex-col py-[15px]'>
            <div className='text-[17px] font-medium'>How do you want to receive the code to reset your password?</div>
            <form className='flex flex-col space-y-4' onSubmit={handleSubmit}>
              <RadioGroup className='space-y-2 text-[15px]' onValueChange={setSelectedOption}>
                {/* Google Account Option */}
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem id='google-account' value='google-account' />
                  <label className='cursor-pointer' htmlFor='google-account'>
                    Use my Google account Log in to Google
                    <p className='text-[13px]'> (if you aren&apos;t already) to quickly reset your password.</p>
                  </label>
                </div>

                {/* Email Code Option */}
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem id='email-code' value='email-code' />
                  <label className='cursor-pointer' htmlFor='email-code'>
                    Send code via email
                  </label>
                </div>

                {/* Enter Password Option */}
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem id='enter-password' value='enter-password' />
                  <label className='cursor-pointer' htmlFor='enter-password'>
                    Enter Password to Log In
                  </label>
                </div>
              </RadioGroup>

              {/* Submit Button */}
              <div className='self-end'>
                <Button asChild className='bg-gray-200 text-black' type='button'>
                  <Link href='/web'>Not you?</Link>
                </Button>
                <button className='ml-2 mt-4 rounded bg-blue-500 px-4 py-2 text-white' type='submit'>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
