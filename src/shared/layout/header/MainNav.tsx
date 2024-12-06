'use client';
import { House, ShoppingBag, Users, Video } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import TooltipWrapper from 'src/shared/components/tooltip/TooltipWrapper';
import { NavItem } from 'src/shared/types/general';

const navs: NavItem[] = [
  {
    icon: House,
    label: 'Trang chủ',
    link: '/',
  },
  {
    icon: Video,
    label: 'Video',
    link: '/watch',
  },
  {
    icon: ShoppingBag,
    label: 'Marketplace',
    link: '/marketplace',
  },
  {
    icon: Users,
    label: 'Nhóm',
    link: '/group',
  },
];

export default function MainNav() {
  const pathname = usePathname();
  return (
    <ul className='flex h-full items-center justify-center'>
      {navs.map((nav, i) => {
        const Icon = nav.icon;
        return (
          <li className='relative h-full max-w-[150px] flex-1 p-2' key={i}>
            <div className='flex size-full items-center justify-center rounded-md hover:bg-lightgray'>
              <TooltipWrapper tooltipContent={nav.label}>
                <Link href={nav.link}>
                  <Icon className='text-primary' size={24} />
                </Link>
              </TooltipWrapper>
            </div>
            {pathname === nav.link ? <div className='absolute bottom-0 left-0 h-1 w-full bg-primary' /> : null}
          </li>
        );
      })}
    </ul>
  );
}
