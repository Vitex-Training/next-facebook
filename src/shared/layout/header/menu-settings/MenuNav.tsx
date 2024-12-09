import { Newspaper, NotepadText, User, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  AppCommand,
  AppCommandEmpty,
  AppCommandGroup,
  AppCommandItem,
  AppCommandList,
} from 'src/shared/components/command/AppCommand';
import SearchCommandInput from 'src/shared/components/command/SearchCommandInput';
import { NavItem } from 'src/shared/types/general';

const navs: NavItem[] = [
  {
    description: 'Tìm kiếm bạn bè hoặc những người bạn quen biết',
    icon: User,
    label: 'Bạn bè',
    link: '/friends',
  },

  {
    description: 'Kết nối với những người cùng chung sở thích',
    icon: Users,
    label: 'Nhóm',
    link: '/groups',
  },
  {
    description: 'Xem bài biết của những người bạn theo dõi',
    icon: Newspaper,
    label: 'Bảng tin',
    link: '/watch',
  },
  {
    description: 'Xem bài biết gần đây từ bạn bè, nhóm và hơn thế nữa',
    icon: NotepadText,
    label: 'Bảng feed',
    link: '/marketplace',
  },
];

export default function MenuNav() {
  const router = useRouter();
  return (
    <div className='flex flex-col gap-2'>
      <span className='text-lg font-bold'>Menu</span>
      <div className='shadow-lg'>
        <AppCommand>
          <div className='flex w-[calc(100vw-2rem)] flex-col items-start justify-center gap-2 p-2 sm:w-[360px]'>
            <SearchCommandInput className='w-full' inputProps={{ placeholder: 'Tìm kiếm trong menu' }} />
            <AppCommandList>
              <AppCommandEmpty>
                <div className='flex flex-col items-center justify-center'>
                  <span className='font-bold'>Không tìm thấy kết quả nào</span>
                  <span className='text-up-sm'>Hãy thử dùng từ khóa khác hoặc kiểm tra chính tả.</span>
                </div>
              </AppCommandEmpty>
              <AppCommandGroup>
                {navs.map((nav, i) => {
                  const Icon = nav.icon;
                  return (
                    <AppCommandItem
                      asChild
                      key={i}
                      onSelect={(currentValue) => {
                        const foundNav = navs.find((nav) => nav.label === currentValue);
                        router.push(foundNav!.link!);
                      }}
                      value={nav.label}>
                      <div className='flex items-start justify-start gap-2 hover:bg-lightgray'>
                        <Icon size={30} />
                        <div className='flex flex-col items-start'>
                          <span className='font-semibold'>{nav.label}</span>
                          <span className='text-up-xs'>{nav.description as string}</span>
                        </div>
                      </div>
                    </AppCommandItem>
                  );
                })}
              </AppCommandGroup>
            </AppCommandList>
          </div>
        </AppCommand>
      </div>
    </div>
  );
}
