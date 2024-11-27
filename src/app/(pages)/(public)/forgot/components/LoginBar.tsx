import Link from 'next/link';
import { Button } from 'src/shared/components/button/Button';

export function LoginBar() {
  return (
    <div className='flex px-3 py-2 align-middle'>
      <h1 className='text-2xl font-bold text-blue-600'>facebook</h1>
      <form action='' className='ml-auto flex items-center gap-x-2'>
        <input className='rounded-md border border-gray-400 p-2' placeholder='Email or phone' type='text' />
        <input className='rounded-md border border-gray-400 p-2' placeholder='Password' type='text' />
        <Button className='bg-blue-600 text-white'>Log in</Button>
        <Link className='text-blue-600' href='/'>
          Forgotten account?
        </Link>
      </form>
    </div>
  );
}
