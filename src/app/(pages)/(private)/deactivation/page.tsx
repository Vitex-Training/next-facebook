'use client';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputWithError from 'src/app/(pages)/(public)/register/components/InputWithError';
import { Avatar, AvatarFallback, AvatarImage } from 'src/shared/components/avatar/avatar';
import { Button } from 'src/shared/components/button/Button';
import { RadioGroup, RadioGroupItem } from 'src/shared/components/radio-group/radio-group';
import { Separator } from 'src/shared/components/separator/separator';
import { deactivateUserAuth } from 'src/shared/services/firebase/deactivateUser';
import { deleteUserAuth } from 'src/shared/services/firebase/deleteUser';
import { reauthenticateAuth } from 'src/shared/services/firebase/reauthenticate';

type PasswordForm = {
  password: string;
};
export type Deactivation = 'Deactivate' | 'Delete';

export default function Page() {
  const [error, setError] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname);
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<PasswordForm>();
  const [action, setAction] = useState<Deactivation>('Deactivate');
  const handleDeactivation: SubmitHandler<PasswordForm> = (data) => {
    reauthenticateAuth(data.password).then((isAuthenticated) => {
      if (!isAuthenticated) {
        setError(true);
        return;
      }
      if (action === 'Deactivate') {
        deactivateUserAuth();
      } else {
        deleteUserAuth();
      }
      routerApp.replace('/login');
    });
  };
  return (
    <div className='mx-auto max-w-xl rounded-lg bg-white-0'>
      <div className='p-4'>
        <h1 className='mb-0 text-[17px] font-medium text-[#080809]'>Deactivating or deleting your Facebook account</h1>
        <p className='mb-2 text-[15px]'>
          If you want to take a break from Facebook, you can deactivate your account. If you want to permanently delete
          your Facebook account, let us know.
        </p>
        <div>
          <RadioGroup value={action}>
            <div
              className='flex justify-start space-x-2 rounded-lg border p-3 hover:cursor-pointer hover:bg-slate-100'
              onClick={() => setAction('Deactivate')}>
              <RadioGroupItem
                className='mt-1 size-6 border-2 data-[state=checked]:border-blue-700 data-[state=checked]:text-blue-700'
                id='r1'
                value='Deactivate'
              />
              <div className='text-[15px] text-[#65686c]'>
                <h1 className='text-[17px] font-medium text-[#080809]'>Deactivate account</h1>
                <p className='font-medium'>This is temporary</p>
                <p className='leading-5'>
                  Your account will be disabled and your name and photos will be removed from most things you&apos;ve
                  shared. You&apos;ll be able to continue using Messenger.
                </p>
              </div>
            </div>
            <div
              className='flex justify-start space-x-2 rounded-lg border p-3 hover:cursor-pointer hover:bg-slate-100'
              onClick={() => setAction('Delete')}>
              <RadioGroupItem
                className='mt-1 size-6 border-2 data-[state=checked]:border-blue-700 data-[state=checked]:text-blue-700'
                id='r2'
                value='Delete'
              />
              <div className='text-[15px] text-[#65686c]'>
                <h1 className='text-[17px] font-medium text-[#080809]'>Delete account</h1>
                <p className='font-medium'>This is permanent</p>
                <p className='leading-5'>
                  When you delete your Facebook account, you won&apos;t be able to retrieve the content or information
                  you&apos;ve shared on Facebook. Your Messenger and all of your messages will also be deleted.
                </p>
              </div>
            </div>
          </RadioGroup>
        </div>
      </div>
      <Separator />
      <form onSubmit={handleSubmit(handleDeactivation)}>
        <div className='space-y-2 p-4'>
          <div className='flex items-center justify-start gap-4'>
            <Avatar>
              <AvatarImage alt='avatar' src='https://github.com/shadcn.png' />
              <AvatarFallback>AVT</AvatarFallback>
            </Avatar>
            <p className='font-medium'>Tuấn Hải</p>
          </div>
          <p>The action you are taking requires that you re-enter your password.</p>
          <InputWithError
            errorMessage={String(errors.password?.message)}
            placeholder='Password'
            register={register('password', { required: 'Please enter your password' })}
            type='password'
          />
          {error && <p className='text-sm text-red-500'>Your password is incorrect!</p>}
          <Link className='inline-block font-medium text-[#1b74e4]' href='/forgot'>
            Forgot your password?
          </Link>
        </div>
        <Separator />
        <div className='flex justify-end gap-3 p-4 max-[400px]:flex-col'>
          <Button className='order-1 bg-slate-200 font-semibold max-[400px]:order-2' variant='secondary'>
            Cancel
          </Button>
          <Button className='order-2 max-[400px]:order-1' variant='destructive'>
            {action} your account
          </Button>
        </div>
      </form>
    </div>
  );
}
