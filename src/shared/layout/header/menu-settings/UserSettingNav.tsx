import { useMutation } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { LogOut, Settings } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CurrentUserAvatar from 'src/shared/components/avatar/CurrentUserAvatar';
import { AppButton } from 'src/shared/components/button/AppButton';
import AppDivider from 'src/shared/components/divider/AppDivider';
import { logout } from 'src/shared/services/firebase/auth/auth';
import { currentUserAtom } from 'src/shared/states/auth';
import { NavItem } from 'src/shared/types/general';

const navs: NavItem[] = [{ icon: Settings, label: 'Cài đặt và quyền riêng tư', link: '/settings' }];

export default function UserSettingNav() {
  const currentUser = useAtomValue(currentUserAtom);
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: logout,
  });

  const onLogout = () => {
    mutation.mutate();
  };

  const handleGotoProfile = () => {
    router.push(`/profile/${currentUser?.uid}`);
  };

  return (
    <div className='flex w-[calc(100vw-2rem)] flex-col gap-3 md:w-[360px]'>
      <div className='flex flex-col gap-3 rounded-md p-3 shadow-lg'>
        <div className='flex items-center justify-start gap-2'>
          <CurrentUserAvatar />
          <span className='text-lg font-semibold'>{currentUser?.firstName}</span>
        </div>
        <AppDivider />
        <AppButton className='rounded-md' onClick={handleGotoProfile} type='button' variant='icon'>
          Xem trang cá nhân
        </AppButton>
      </div>

      <ul className='flex flex-col'>
        {navs.map((nav, i) => {
          const Icon = nav.icon;

          return (
            <li className='flex items-center justify-between py-2' key={i}>
              <Link className='w-full' href={nav.link}>
                <div className='flex w-full items-center justify-start gap-2'>
                  <button className='flex w-full items-center justify-start gap-2' type='button'>
                    <Icon size={16} />
                    <span>{nav.label}</span>
                  </button>
                </div>
              </Link>
            </li>
          );
        })}
        <li className='flex items-center justify-between py-2'>
          <div className='flex w-full items-center justify-start gap-2'>
            <button className='flex w-full items-center justify-start gap-2' onClick={onLogout} type='button'>
              <LogOut size={16} />
              <span>Đăng xuất</span>
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
}
