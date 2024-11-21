'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleHelpIcon } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { registerAuth } from 'src/app/lib/actions/register';
import { z } from 'zod';

import InputWithError from './InputWithError';

const listMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const formSchema = z.object({
  account: z.union([
    z.string().email('Invalid email or phone number format'),
    z.string().regex(/^(\+?[1-9]\d{1,14}|0\d{9,10})$/, 'Invalid phone number format'),
  ]),
  firstname: z
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

export default function FormRegister() {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<RegisterType>({ resolver: zodResolver(formSchema) });
  const onSubmit = (data: RegisterType) => {
    registerAuth(data);
  };
  return (
    <div className='mx-auto h-full max-w-[432px] rounded-lg bg-white pt-1'>
      <div className='px-[10px] py-4 *:text-center'>
        <p className='text-2xl font-bold text-[#1c1e21]'>Create a new account</p>
        <p className='text-base text-[#606770]'>It&apos;s quick and easy</p>
      </div>
      <div className='border-t border-[#dadde1] p-4'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col sm:flex-row sm:justify-between'>
            <InputWithError
              additionalClass='sm:w-[192px] leading-none mb-2'
              errorMessage={String(errors.firstname?.message)}
              placeholder='First name'
              register={register('firstname')}
              type='text'
            />
            <InputWithError
              additionalClass='sm:w-[192px] leading-none mb-2'
              errorMessage={String(errors.surname?.message)}
              placeholder='Surname'
              register={register('surname')}
              type='text'
            />
          </div>
          <div>
            <div className='relative mb-1 mt-[2divx] text-left text-xs text-[#606770]'>
              Date of birth <CircleHelpIcon className='peer inline-block' size={14} />
              <div className='absolute hidden max-w-64 border border-slate-600 bg-white p-2 shadow-lg peer-hover:block'>
                Providing your birthday helps make sure that you get the right Facebook experience for your age. If you
                want to change who sees this, go to the About section of your profile. For more details, please visit
                our Privacy Policy.
              </div>
            </div>
            <div className='flex justify-between *:w-1/3'>
              <select className='h-9 rounded-sm border border-[#ccd0d5] pl-2'>
                {Array.from({ length: 30 }, (v, index) => (
                  <option key={index} value={String(index + 1)}>
                    {index + 1}
                  </option>
                ))}
              </select>
              <select className='mx-2 h-9 rounded-sm border border-[#ccd0d5] pl-2'>
                {listMonths.map((m, idx) => (
                  <option key={idx} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <select className='h-9 rounded-sm border border-[#ccd0d5] pl-2'>
                {Array.from({ length: 100 }, (v, index) => (
                  <option key={index} value={String(2024 - index)}>
                    {2024 - index}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className='mt-2'>
            <div className='relative mb-1 mt-[2px] text-left text-xs text-[#606770]'>
              Gender <CircleHelpIcon className='peer inline-block' size={14} />
              <div className='absolute hidden max-w-64 border border-slate-600 bg-white p-2 shadow-lg peer-hover:block'>
                You can change who sees your gender on your profile later. Select Custom to choose another gender, or if
                you&apos;d rather not say.
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
            additionalClass='leading-4 mt-3 mb-2'
            errorMessage={String(errors.account?.message)}
            placeholder='Mobile number or email address'
            register={register('account')}
            type='text'
          />
          <InputWithError
            additionalClass='leading-4 mt-3 mb-2'
            errorMessage={String(errors.password?.message)}
            placeholder='New password'
            register={register('password')}
            type='password'
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
          <button className='mb-2 h-9 w-48 rounded-md bg-[#00a400] text-lg font-bold text-white'>Sign Up</button>
          <div className='py-3'>
            <Link className='text-base text-[#1877f2]' href='/login'>
              Already have an account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
