'use client';
import Link from 'next/link';
import { redirect, useSearchParams } from 'next/navigation';
import { Button } from 'src/shared/components/button/Button';
import { Label } from 'src/shared/components/label/Label';
import { RadioGroup, RadioGroupItem } from 'src/shared/components/radio-group/RadioGroup';

import { LoginBar } from '../components/LoginBar';

export default function Page() {
  const searchParams = useSearchParams();
  const email: string = searchParams?.get('email') || '';
  const senForgotpasswordEmail = () => {
    fetch(`/api/reset-password`, {
      body: JSON.stringify({
        email,
      }),
      headers: {
        'content-type': 'application/json',
      },
      method: 'post',
    }).then(async (res) => {
      if (res.status === 200) {
        redirect('/login');
      } else {
        const error = await res.json();
        alert(error);
      }
    });
  };

  return (
    <div>
      <LoginBar />
      <div className='flex justify-center bg-slate-200 py-[80px]'>
        <div className='flex w-[500px] justify-center rounded-sm bg-white py-[80px] shadow-md'>
          <div>
            <RadioGroup defaultValue='option-one'>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem id='option-one' value='option-one' />
                <Label className='text-sm font-medium' htmlFor='option-one'>
                  Use my Google account Log in to Google (if you aren&apos;t already) to quickly reset your password.
                </Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem id='option-two' value='option-two' />
                <Label className='text-sm font-medium' htmlFor='option-two'>
                  Send code via email {email}
                </Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem id='option-three' value='option-three' />
                <Label className='text-sm font-medium' htmlFor='option-two'>
                  Enter Password to Log In
                </Label>
              </div>
            </RadioGroup>
            <div className='ml-auto flex gap-2'>
              <Button asChild className='bg-gray-200 text-black' type='button'>
                <Link href='/'>Not You?</Link>
              </Button>
              <Button className='bg-blue-600 text-white' type='button' onClick={senForgotpasswordEmail}>
                Continue
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
