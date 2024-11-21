import Image from 'next/image';

import fb from '../../../../../../public/images/4lCu2zih0ca.svg';
import FormRegister from './components/FormRegister';

export default function RegisterPage() {
  return (
    <div className='bg-[#f0f2f5] text-center'>
      <div className='inline-block'>
        <Image alt='facebook logo' height={100} priority={true} quality={100} src={fb} width={302} />
      </div>
      <FormRegister />
    </div>
  );
}
