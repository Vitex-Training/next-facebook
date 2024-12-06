import { useQuery } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  AppCommand,
  AppCommandEmpty,
  AppCommandGroup,
  AppCommandInput,
  AppCommandItem,
  AppCommandList,
} from 'src/shared/components/command/AppCommand';
import { getFriendsOfUser } from 'src/shared/services/firebase/user/getFriendsOfUser';
import { UserInfo } from 'src/shared/types/user';
import { getFullName } from 'src/shared/utils/getFullName';

export default function Friends() {
  const params = useParams<{ uid: UserInfo['uid'] }>();

  const { data } = useQuery({
    queryFn: async () => {
      const friends = await getFriendsOfUser(params.uid);
      return friends;
    },
    queryKey: ['friends', params.uid],
  });
  return (
    <div className='flex flex-col'>
      <div>
        <AppCommand>
          <div className='flex items-center justify-between gap-2 px-2'>
            <AppCommandInput placeholder='Tìm kiếm bạn bè' />
            <Search />
          </div>
          <AppCommandList className=''>
            <AppCommandEmpty>No friends found</AppCommandEmpty>
            <AppCommandGroup className='[&_[cmdk-group-items]]:col-auto [&_[cmdk-group-items]]:grid [&_[cmdk-group-items]]:grid-cols-3 md:[&_[cmdk-group-items]]:grid-cols-6'>
              {data?.map((user) => {
                return (
                  <AppCommandItem key={user.uid}>
                    <div className='flex w-full flex-col items-center gap-1'>
                      <Link href={`/profile/${user.uid}`}>
                        <Image
                          alt={getFullName(user)}
                          className='w-full'
                          height={100}
                          src='/default-avatar.jpg'
                          width={100}
                        />
                        <span>{getFullName(user)}</span>
                      </Link>
                    </div>
                  </AppCommandItem>
                );
              })}
            </AppCommandGroup>
          </AppCommandList>
        </AppCommand>
      </div>
    </div>
  );
}
