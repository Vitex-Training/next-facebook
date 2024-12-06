import Image from 'next/image';

export default function SmallLoading() {
  return <Image alt='loading' height={11} src='/loading.gif' unoptimized width={16} />;
}
