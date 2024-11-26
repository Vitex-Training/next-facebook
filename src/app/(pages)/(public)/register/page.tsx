import Image from 'next/image';

import FormRegister from './components/FormRegister';

export default function RegisterPage() {
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
      <FormRegister />
    </>
  );
}
