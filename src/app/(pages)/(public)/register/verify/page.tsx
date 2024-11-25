'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'src/shared/components/button/Button';
import { z } from 'zod';

import InputWithError from '../components/InputWithError';

const emailSchema = z.object({
  email: z.string().email('Invalid email format'),
});
type emailType = z.infer<typeof emailSchema>;

const ConfirmCode = ({ email }: { readonly email: string }) => {
  return (
    <div>
      <h1 className='mb-2 text-2xl font-bold text-[#050505]'>Verification sent</h1>
      <p className='mb-2'>We sent a verify link to the email address that you provided: {email}</p>
    </div>
  );
};

const EnterMailAddress = ({ onSubmit }: { readonly onSubmit: (data: emailType) => void }) => {
  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
  } = useForm<emailType>({ resolver: zodResolver(emailSchema) });
  return (
    <form className='text-left' onSubmit={handleSubmit(onSubmit)}>
      <h1 className='mb-2 text-2xl font-bold text-[#050505]'>Enter an email address</h1>
      <p className='mb-2'>
        To make sure that we can update you on progress, please provide your email address. If there are any issues
        confirming your identity, we&apos;ll email you directly. To verify this email address, we&apos;ll send you a
        confirmation code.
      </p>
      <InputWithError
        errorMessage={String(errors.email?.message)}
        placeholder='Enter email address'
        register={register('email')}
        type='text'
      />
      <Button
        className='mt-4 w-full disabled:pointer-events-auto disabled:cursor-not-allowed'
        disabled={!isValid}
        variant='facebook'>
        Send Register Code
      </Button>
    </form>
  );
};

export default function VerifyRegister() {
  const [submitEmail, setSubmitEmail] = useState(false);
  const [userEmail, setUserEmail] = useState<null | string>(null);
  const handleEmailSubmit = (data: emailType) => {
    setUserEmail(data.email);
    setSubmitEmail(true);
  };
  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='mx-auto max-w-xl rounded-lg bg-white p-5'>
        {submitEmail ? <ConfirmCode email={userEmail!} /> : <EnterMailAddress onSubmit={handleEmailSubmit} />}
      </div>
    </div>
  );
}
