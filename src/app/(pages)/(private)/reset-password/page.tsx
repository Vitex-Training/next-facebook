'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { CircleAlert, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AppButton } from 'src/shared/components/button/AppButton';
import FormWrapper from 'src/shared/components/form/FormWrapper';
import { resetPwd } from 'src/shared/services/firebase/auth/resetPwd';
import { auth } from 'src/shared/services/firebase/config';
import { z } from 'zod';

const ResetPwdFormSchema = z
  .object({
    confirmPassword: z.string(),
    currentPassword: z
      .string({
        required_error: 'This field is required',
      })
      .min(1),
    newPassword: z
      .string()
      .min(6, {
        message:
          "Choose a more secure password that you don't use anywhere else. It should be at least 6 characters and difficult for others to guess.",
      })
      .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!$@%]).*$/, {
        message:
          "Choose a more secure password that you don't use anywhere else. It should be at least 6 characters and difficult for others to guess.",
      }),
  })
  .refine(
    (data) => {
      return data.newPassword === data.confirmPassword;
    },
    {
      message: 'New password does not match. Enter new password again here.',
      path: ['confirmPassword'], // path to the error,
    },
  );

export type ResetPwdFormType = z.infer<typeof ResetPwdFormSchema>;
type ResetPwdFormKeys = keyof ResetPwdFormType;

export default function Page() {
  const [showPwdList, setShowPwdLists] = useState<ResetPwdFormKeys[]>([]);

  const router = useRouter();
  const user = auth.currentUser;

  const defaultValues: ResetPwdFormType = {
    confirmPassword: '',
    currentPassword: '',
    newPassword: '',
  };

  const methods = useForm<ResetPwdFormType>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(ResetPwdFormSchema),
  });

  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
    trigger,
    watch,
  } = methods;

  const mutation = useMutation({
    mutationFn: resetPwd,
    onError(error) {
      if (error.name === 'invalid-current-password') {
        setError('currentPassword', { message: error.message, type: 'custom' });
      }
    },
    onSuccess() {
      router.push('/');
    },
  });
  const onSubmit = (data: ResetPwdFormType) => {
    mutation.mutate(data);
  };
  const handleShowPwdList = (name: ResetPwdFormKeys) => {
    setShowPwdLists((prev) => {
      const isAlreadyShow = prev.find((nameKey) => nameKey === name);
      if (isAlreadyShow) {
        return prev.filter((nameKey) => nameKey !== name);
      } else return [...prev, name];
    });
  };

  useEffect(() => {
    const subscription = watch((_value, { name }) => {
      if (name === 'newPassword' || name === 'confirmPassword') {
        void trigger(['newPassword', 'confirmPassword']);
      }
    });

    // Cleanup the subscription on unmount.
    return () => subscription.unsubscribe();
  }, [watch, trigger]);

  const textMap: { label: string; name: keyof ResetPwdFormType }[] = [
    {
      label: 'Current password',
      name: 'currentPassword',
    },
    {
      label: 'New password',
      name: 'newPassword',
    },
    {
      label: 'Retype password',
      name: 'confirmPassword',
    },
  ];
  return (
    <main>
      <section className='mt-[40px] flex items-center justify-center'>
        <FormWrapper
          className='flex w-full flex-col gap-3 rounded-3xl p-5 sm:w-[600px]'
          onSubmit={handleSubmit(onSubmit)}>
          {/* header */}
          <div className='flex flex-col gap-1'>
            <span>{user?.email} · Facebook</span>
            <h1 className='text-2xl font-semibold'>Change password</h1>
            <span className='text-up-sm' id='newPassword-note'>
              Your password must be at least 6 characters and should include a combination of numbers, letters and
              special characters (!$@%).
            </span>
          </div>

          {/* inputs  */}
          <div className='flex flex-1 flex-col gap-4'>
            {textMap.map((obj, i) => {
              const isShowPwd = showPwdList.find((namekey) => namekey === obj.name);
              return (
                <div key={i}>
                  <div
                    className={`relative flex flex-col rounded-2xl border border-input-border px-4 py-[10px] focus-within:border-input-focus-border hover:border-input-focus-border ${
                      errors[obj.name] && '!border-input-error-border'
                    }`}>
                    <input
                      autoFocus={i === 0}
                      {...register(obj.name)}
                      aria-describedby={obj.name === 'newPassword' ? 'newPassword-note' : ''}
                      aria-invalid={!!errors[obj.name]}
                      aria-label={obj.label}
                      className='peer m-0 h-8 border-none pt-3 text-base outline-none placeholder:text-transparent focus-within:border-none focus-within:outline-none'
                      id={obj.name}
                      placeholder={obj.label}
                      type={isShowPwd ? 'text' : 'password'}
                    />
                    <label
                      className={`absolute left-4 top-3 m-0 -translate-y-1/2 text-up-xs font-normal text-input-focus-border peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-up-sm peer-focus-within:top-3 peer-focus-within:text-up-xs ${
                        errors[obj.name] && 'text-input-error-border'
                      }`}
                      htmlFor={obj.name}>
                      {obj.label}
                    </label>
                    <button
                      aria-label={isShowPwd ? 'Hide password' : 'Show password'}
                      className='absolute right-[12px] top-1/2 -translate-y-1/2 cursor-pointer'
                      onClick={() => handleShowPwdList(obj.name)}
                      type='button'>
                      {isShowPwd ? <Eye size={14} /> : <EyeOff size={14} />}
                    </button>
                  </div>
                  {errors[obj.name] && (
                    <div className='mt-[10px] flex items-center gap-2 text-sm text-input-error-border'>
                      <div>
                        <CircleAlert />
                      </div>
                      <span>{errors[obj.name]?.message}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <Link className='text-up-sm font-medium hover:underline' href='/login/identify'>
            Forgotten your password?
          </Link>
          {/* footer */}
          <div>
            <div className='flex items-center gap-2 pb-16 pt-4'>
              <input className='size-5' type='checkbox' />
              <label className='text-up-sm font-semibold'>
                Log out of other devices. Choose this if someone else used your account.
              </label>
            </div>
            <AppButton
              className='w-full rounded-full'
              disabled={!methods.formState.isValid || mutation.isPending}
              size='lg'
              type='submit'>
              Change Password
            </AppButton>
          </div>
        </FormWrapper>
      </section>
    </main>
  );
}
