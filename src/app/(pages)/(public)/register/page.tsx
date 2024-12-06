'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { CircleHelpIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { AppButton } from 'src/shared/components/button/AppButton';
import InputWithError from 'src/shared/components/input/InputWithError';
import SmallLoading from 'src/shared/components/loading/SmallLoading';
import { register as registerAuth } from 'src/shared/services/firebase/register';
import { z } from 'zod';

const listMonths = [
  { name: 'Jan', value: '1' },
  { name: 'Feb', value: '2' },
  { name: 'Mar', value: '3' },
  { name: 'Apr', value: '4' },
  { name: 'May', value: '5' },
  { name: 'Jun', value: '6' },
  { name: 'Jul', value: '7' },
  { name: 'Aug', value: '8' },
  { name: 'Sep', value: '9' },
  { name: 'Oct', value: '10' },
  { name: 'Nov', value: '11' },
  { name: 'Dec', value: '12' },
];

const formSchema = z.object({
  account: z.union([
    z.string().email('Invalid email or phone number format'),
    z.string().regex(/^(\+?[1-9]\d{1,14}|0\d{9,10})$/, 'Invalid phone number format'),
  ]),
  date: z.object({
    day: z.string(),
    month: z.string(),
    year: z.string(),
  }),
  firstName: z
    .string()
    .regex(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯàáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặẹẻẽềềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ\s]*$/, {
      message: 'Numbers and special characters are not allowed',
    })
    .min(3, "What's your surname"),
  gender: z.enum(['male', 'female']),
  password: z
    .string()
    .min(6, 'Password must at least 6 characters')
    .regex(/[A-Za-z]/, 'Password must be at least 1 word')
    .regex(/[0-9]/, 'Password must be at least 1 number')
    .refine(
      (value) => !/[^\w]/.test(value), // Loại bỏ ký tự đặc biệt
      { message: 'Password cannot contain special character' },
    ),
  surname: z
    .string()
    .regex(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯàáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặẹẻẽềềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ\s]*$/, {
      message: 'Numbers and special characters are not allowed',
    })
    .min(3, "What's your surname"),
});

export type RegisterType = z.infer<typeof formSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: registerAuth,
    onSuccess: (userDocRefId) => {
      router.push(`/register/verify?id=${userDocRefId}`);
    },
  });
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<RegisterType>({ resolver: zodResolver(formSchema) });
  const onSubmit = (data: RegisterType) => {
    mutation.mutate(data);
  };

  return (
    <>
      <div className=''>
        <Image
          alt='facebook logo'
          height={100}
          priority={true}
          quality={100}
          src='/images/4lCu2zih0ca.svg'
          width={302}
        />
      </div>
      <div className='mx-auto max-w-[432px] rounded-lg bg-white pt-1 shadow-xl'>
        <div className='px-[10px] py-4 *:text-center'>
          <p className='text-2xl font-bold text-foreground'>Create a new account</p>
          <p className='text-base text-gray-500'>It&apos;s quick and easy</p>
        </div>
        {mutation.isError && (
          <div className='mx-4 mb-3 border border-red-400 bg-red-100 p-2 text-center text-sm'>
            <p>{mutation.error.message || 'Something wrong'}</p>
          </div>
        )}
        <div className='border-t border-[#dadde1] p-4'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-2 sm:flex-row sm:justify-between'>
              <InputWithError
                className='mb-2 leading-none'
                errorMessage={errors.firstName?.message}
                placeholder='First name'
                register={register('firstName')}
                type='text'
                variant='secondary'
              />
              <InputWithError
                className='mb-2 leading-none'
                errorMessage={errors.surname?.message}
                placeholder='Surname'
                register={register('surname')}
                type='text'
                variant='secondary'
              />
            </div>
            <div>
              <div className='relative mb-1 mt-[2divx] text-left text-xs text-gray-500'>
                Date of birth <CircleHelpIcon className='peer inline-block' size={14} />
                <div className='absolute z-10 hidden max-w-64 border border-slate-600 bg-white p-2 shadow-lg peer-hover:block'>
                  Providing your birthday helps make sure that you get the right Facebook experience for your age. If
                  you want to change who sees this, go to the About section of your profile. For more details, please
                  visit our Privacy Policy.
                </div>
              </div>
              <div className='flex justify-between *:w-1/3'>
                <select className='h-9 rounded-sm border border-[#ccd0d5] pl-2' {...register('date.day')}>
                  {Array.from({ length: 30 }, (_, index) => (
                    <option key={index} value={String(index + 1)}>
                      {index + 1}
                    </option>
                  ))}
                </select>
                <select className='mx-2 h-9 rounded-sm border border-[#ccd0d5] pl-2' {...register('date.month')}>
                  {listMonths.map((month, index) => (
                    <option key={index} value={month.value}>
                      {month.name}
                    </option>
                  ))}
                </select>
                <select className='h-9 rounded-sm border border-[#ccd0d5] pl-2' {...register('date.year')}>
                  {Array.from({ length: 100 }, (_, index) => {
                    const currentYear = new Date().getFullYear();
                    return (
                      <option key={index} value={String(currentYear - index)}>
                        {currentYear - index}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className='my-2'>
              <div className='relative mb-1 mt-[2px] text-left text-xs text-[#606770]'>
                Gender <CircleHelpIcon className='peer inline-block' size={14} />
                <div className='absolute z-10 hidden max-w-64 border border-slate-600 bg-white p-2 shadow-lg peer-hover:block'>
                  You can change who sees your gender on your profile later. Select Custom to choose another gender, or
                  if you&apos;d rather not say.
                </div>
              </div>
              <div className='flex justify-between gap-2 *:w-1/2'>
                <label
                  className={`flex h-9 items-center justify-center gap-5 rounded-sm border border-[#ccd0d5] ${!!errors.gender && '!border-red-600'}`}>
                  <span>Male</span>
                  <input type='radio' {...register('gender')} value='male' />
                </label>
                <label
                  className={`flex h-9 items-center justify-center gap-5 rounded-sm border border-[#ccd0d5] ${!!errors.gender && '!border-red-600'}`}>
                  <span>Female</span>
                  <input type='radio' {...register('gender')} value='female' />
                </label>
              </div>
            </div>
            <InputWithError
              className='mb-2 leading-4'
              errorMessage={errors.account?.message}
              placeholder='Mobile number or email address'
              register={register('account')}
              type='text'
              variant='secondary'
            />
            <InputWithError
              className='mb-2 leading-4'
              errorMessage={errors.password?.message}
              placeholder='New password'
              register={register('password')}
              type='password'
              variant='secondary'
            />
            <p className='my-4 text-left text-[11px] text-[#777777]'>
              People who use our service may have uploaded your contact information to Facebook.
              <a className='text-[#385898] hover:underline' href='#'>
                Learn more.
              </a>
            </p>
            <p className='my-4 text-left text-[11px] text-[#777777]'>
              By clicking Sign Up, you agree to our {}
              <a className='text-[#385898] hover:underline' href='#'>
                Terms, Privacy Policy {}
              </a>
              and
              <a className='text-[#385898] hover:underline' href='#'>
                {} Cookies Policy
              </a>
              . You may receive SMS notifications from us and can opt out at any time.
            </p>
            <div className='mb-2 flex items-center justify-center gap-4'>
              <AppButton className='w-48' disabled={mutation.isPending} type='submit' variant='secondary'>
                Sign Up
              </AppButton>
              <div>{mutation.isPending ? <SmallLoading /> : null}</div>
            </div>
            <div className='py-3'>
              <Link className='text-base text-[#1877f2]' href='/login'>
                Already have an account?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
