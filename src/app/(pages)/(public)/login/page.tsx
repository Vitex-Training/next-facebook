'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { CircleAlert, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { login } from 'src/lib/actions/auth';
import { AppButton } from 'src/shared/components/button/AppButton';
import FormWrapper from 'src/shared/components/common/FormWrapper';
import SmallLoading from 'src/shared/components/loading/SmallLoading';
import { z } from 'zod';

export const LoginFormSchema = z.object({
  email: z.string({
    required_error: 'This field is required',
  }),
  password: z.string({
    required_error: 'This field is required',
  }),
});

export type LoginFormType = z.infer<typeof LoginFormSchema>;

export default function Page() {
  const [showPwd, setShowPwd] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirectUrl');

  const mutation = useMutation({
    mutationFn: login,
    onSuccess() {
      router.push(redirectUrl ? redirectUrl : '/');
    },
  });

  const defaultValues: LoginFormType = {
    email: '',
    password: '',
  };

  const methods = useForm<LoginFormType>({
    defaultValues,
    resolver: zodResolver(LoginFormSchema),
  });

  const { handleSubmit, register } = methods;

  const onSubmit = (data: LoginFormType) => {
    mutation.mutate(data);
  };

  const handleShowPwd = () => {
    setShowPwd((prev) => !prev);
  };

  return (
    <main className='flex flex-col items-center p-2 pt-[36px] sm:p-0'>
      <div className='text-center'>
        <Image alt='Facebook' className='inline' height={81} src='/logo/text-logo-79x204.svg' width={240} />
      </div>
      {redirectUrl && (
        <div className='border-blue-40 bg-blue-40 relative mx-auto mb-[12px] max-w-screen-sm rounded-[3px] border pl-[40px] md:w-[612px]'>
          <CircleAlert className='bg-white-0 text-blue-40 absolute left-[10px] top-[8px] rounded-full' size='20px' />
          <div className='bg-white-0 px-[10px] py-[9px] text-sm'>You must log in to continue.</div>
        </div>
      )}
      <FormProvider {...methods}>
        <FormWrapper className='flex w-full flex-col gap-[12px] p-4 sm:w-[396px]' onSubmit={handleSubmit(onSubmit)}>
          <h1 className='p-2 text-center'>Log in to Facebook</h1>

          {/* e2c822 */}
          {redirectUrl && (
            <div className='border-yellow-20 bg-yellow-10 border p-[10px] text-center'>You must log in to continue</div>
          )}
          {mutation.isError && (
            <div className='border-red-41 bg-red-10 border p-[10px] text-center'>
              <div className='text-sm font-semibold'>Wrong credentials</div>
              <p>{mutation.error.message || 'Something wrong'}</p>
            </div>
          )}
          <div>
            <input
              autoFocus
              aria-label='Email address or phone number'
              autoComplete='email'
              className='border-gray-10 w-full rounded-md border px-[16px] py-[14px] text-[17px] leading-[22px] placeholder:text-gray-500 focus:outline-none focus:outline-offset-2 focus:ring-2 focus:ring-transparent focus:placeholder:text-gray-300'
              placeholder='Email address or phone number'
              type='text'
              {...register('email')}
              autoFocus
              className='border-gray-10 w-full rounded-md border px-[16px] py-[14px] text-[17px] leading-[22px] placeholder:text-gray-500 focus:outline-none focus:outline-offset-2 focus:ring-2 focus:ring-transparent focus:placeholder:text-gray-300'
            />
          </div>
          <div className='relative'>
            <input
              aria-label='password'
              placeholder='Password'
              type={showPwd ? 'text' : 'password'}
              {...register('password')}
              autoComplete='current-password'
              className='border-gray-10 w-full rounded-md border px-[16px] py-[14px] text-[17px] leading-[22px] placeholder:text-gray-500 focus:outline-none focus:outline-offset-2 focus:ring-2 focus:ring-transparent focus:placeholder:text-gray-300'
            />

            <button
              aria-label={showPwd ? 'Hide password' : 'Show password'}
              className='absolute right-[12px] top-1/2 -translate-y-1/2 cursor-pointer'
              onClick={handleShowPwd}>
              {showPwd ? <Eye size={14} /> : <EyeOff size={14} />}
            </button>
          </div>
          <AppButton
            className='bg-blue-10 hover:bg-blue-40 text-lg font-semibold'
            disabled={mutation.isPending}
            type='submit'>
            Log in
          </AppButton>

          {mutation.isPending ? <SmallLoading /> : null}
          <div className='text-blue-10 mx-auto pb-4 pt-1 text-center text-sm'>
            <Link className='hover:underline' href='/forgot'>
              Forgotten account?
            </Link>
            <span> · </span>
            <Link className='hover:underline' href='/register'>
              Sign up for Facebook
            </Link>
          </div>
        </FormWrapper>
      </FormProvider>
    </main>
  );
}
