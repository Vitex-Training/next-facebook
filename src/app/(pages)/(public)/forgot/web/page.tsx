'use client';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from 'src/shared/components/avatar/Avatar';
import { Button } from 'src/shared/components/button/Button';
export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email: string = searchParams?.get('email') || '';
  const name: string = searchParams?.get('name') || '';

  const handleTryOtherWay = () => {
    router.push(`/forgot/recover?email=${email}&name=${name}`);
  };

  return (
    <div className='flex justify-center bg-slate-200 py-9'>
      <div className='flex flex-col items-center gap-y-2'>
        <h1 className='text-3xl font-bold text-blue-600'>facebook</h1>
        <div className='flex w-[396px] flex-col items-center gap-y-2 rounded-sm bg-white p-9 shadow-xl'>
          <Avatar>
            <AvatarImage src='https://github.com/shadcn.png' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h2>Login as {name}</h2>
          <div className='flex items-center py-2'>
            <div className='text-xs text-gray-400'>{email}</div>
            <span aria-hidden='true' role='presentation'>
              ·
            </span>
            <Link className='text-xs text-blue-600' href='/'>
              Not you?
            </Link>
          </div>
          <form className='flex w-full flex-col gap-y-3'>
            <input className='rounded-md border border-gray-200 p-2' placeholder='Password' type='text' />
            <Button className='bg-blue-600 text-xl font-semibold text-white' type='button'>
              Log in
            </Button>
            <Button className='bg-gray-200 text-xl font-semibold text-black' onClick={handleTryOtherWay} type='button'>
              Try another way
            </Button>
          </form>
          <Link className='pt-2 text-xs text-blue-600' href='/'>
            Forgotten account?
          </Link>
        </div>
      </div>
    </div>
  );
}
