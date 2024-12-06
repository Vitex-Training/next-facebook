'use client';

import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { Camera, CameraIcon, Edit, Plus } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { AppAvatar, AppAvatarImage } from 'src/shared/components/avatar/AppAvatar';
import { AppBadgeSticker, AppBadgeStickerContent } from 'src/shared/components/badge-sticker/AppBadgeSticker';
import { AppButton } from 'src/shared/components/button/AppButton';
import AppDivider from 'src/shared/components/divider/AppDivider';
import {
  AppDropdownMenu,
  AppDropdownMenuContent,
  AppDropdownMenuLabel,
  AppDropdownMenuSeparator,
  AppDropdownMenuTrigger,
} from 'src/shared/components/dropdown-menu/AppDropdownMenu';
import { AppTabs, AppTabsContent, AppTabsList, AppTabsTrigger } from 'src/shared/components/tabs/AppTabs';
import sendFriendRequest from 'src/shared/services/firebase/friendShip/sendFriendRequest';
import { getFriendsOfUser } from 'src/shared/services/firebase/user/getFriendsOfUser';
import { getUserInfoByUid } from 'src/shared/services/firebase/user/getUserInfoByUid';
import { currentUserAtom } from 'src/shared/states/auth';
import { UserInfo } from 'src/shared/types/user';
import { getFullName } from 'src/shared/utils/getFullName';

import Friends from './components/Friends';
import Photos from './components/Photos';
import Posts from './components/Posts';
import Videos from './components/Videos';

const tabs = [
  { comp: Posts, label: 'Bài viết', value: 'posts' },
  { comp: Friends, label: 'Bạn bè', value: 'friends' },
  { comp: Photos, label: 'Ảnh', value: 'photos' },
  { comp: Videos, label: 'Video', value: 'videos' },
];

interface UserInfoExtend extends UserInfo {
  friends: UserInfo[];
}

export default function Page() {
  const params = useParams<{ uid: UserInfo['uid'] }>();
  const currentUser = useAtomValue(currentUserAtom);
  const [profile, setProfile] = useState<UserInfoExtend>({
    avatar: '',
    coverPhoto: {
      link: '',
      metadata: {
        name: '',
      },
    },
    dateOfBirth: '',
    deactivate: false,
    email: '',
    firstName: '',
    friends: [],
    gender: 'female',
    surname: '',
    uid: '',
  });

  const { data } = useQuery({
    enabled: !!params.uid,
    queryFn: async () => {
      const uid = params.uid;
      const user = await getUserInfoByUid(uid);

      if (!user) throw new Error('User not found');

      const friends = await getFriendsOfUser(uid);

      return { ...user, friends };
    },
    queryKey: ['users', params.uid],
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const iscurrentUserBeFriendThisUser = useMemo(
    () => profile.friends.find((user) => user.uid === currentUser?.uid),
    [profile, currentUser],
  );

  useEffect(() => {
    if (data) {
      setProfile(data);
    }
  }, [data]);

  return (
    <section>
      {/* header */}
      <div className='flex justify-center bg-white shadow-md'>
        <div className='flex w-full flex-col gap-2 md:w-[800px] lg:w-[980px]'>
          {/* cover photo */}
          <div className='relative'>
            <Image
              alt={profile?.coverPhoto?.metadata.name ? profile.coverPhoto.metadata.name : 'cover photo'}
              className='h-[230px] w-full rounded-md object-cover md:h-[380px]'
              height={100}
              src={profile?.coverPhoto?.link ? profile?.coverPhoto?.link : '/default-avatar.jpg'}
              width={100}
            />
            {currentUser?.uid === params.uid ? (
              <div className='absolute bottom-3 right-3'>
                <AppDropdownMenu>
                  <AppDropdownMenuTrigger asChild>
                    <AppButton
                      className='focus-visible:ring-0 focus-visible:ring-transparent'
                      type='button'
                      variant='icon'>
                      <span className='hidden md:flex'>Chỉnh sửa ảnh bìa</span>
                      <Camera className='flex md:hidden' />
                    </AppButton>
                  </AppDropdownMenuTrigger>
                  <AppDropdownMenuContent>
                    <VisuallyHidden.Root>
                      <AppDropdownMenuLabel>Avatar</AppDropdownMenuLabel>
                    </VisuallyHidden.Root>
                    <label>
                      <input
                        hidden
                        type='file'
                        // accept='' TODO
                      />
                      Tải ảnh lên
                    </label>

                    <AppDropdownMenuSeparator />
                    <button type='button'>Gỡ</button>
                  </AppDropdownMenuContent>
                </AppDropdownMenu>
              </div>
            ) : null}
          </div>
          <div className='flex flex-col px-2'>
            {/* avatar and relationships */}
            <div className='relative flex flex-col items-center justify-between gap-4 md:top-0 md:flex-row'>
              <div className='flex flex-col items-center justify-center gap-3 md:flex-row md:justify-start'>
                {currentUser?.uid === params.uid ? (
                  <AppBadgeSticker className='absolute top-[-88px] md:relative md:top-0'>
                    <AppBadgeStickerContent>
                      <AppButton size='icon' variant='icon'>
                        <CameraIcon />
                      </AppButton>
                    </AppBadgeStickerContent>
                    <AppAvatar className='size-44 rounded-full border-4 border-white'>
                      <AppAvatarImage alt={profile.firstName} src={profile.avatar} />
                    </AppAvatar>
                  </AppBadgeSticker>
                ) : (
                  <AppAvatar className='absolute top-[-88px] size-44 rounded-full border-4 border-white md:relative md:top-0'>
                    <AppAvatarImage alt={profile.firstName} src={profile.avatar} />
                  </AppAvatar>
                )}
                <div className='h-[88px] md:hidden'></div>
                <div className='flex flex-col items-center gap-[6px] md:items-start'>
                  <h1 className='text-3xl font-bold'>{getFullName(profile)}</h1>
                  <span className='text-small-icon-foreground'>{profile.friends.length} người bạn</span>
                  <ul className='flex'>
                    {profile?.friends.map((friend, i) => {
                      return (
                        <li className='max-w-6 last:max-w-8' key={i}>
                          <AppAvatar className='size-8 rounded-full border-2 border-white'>
                            <AppAvatarImage alt={getFullName(friend)} src={friend.avatar} />
                          </AppAvatar>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              {/* action btn */}
              <div className='flex w-full flex-col items-center justify-center gap-3 md:w-auto md:flex-row md:justify-end'>
                {currentUser?.uid === params.uid ? (
                  <>
                    <AppButton className='w-full md:w-auto' type='button'>
                      <Plus size={14} />
                      Thêm vào tin
                    </AppButton>

                    <AppButton className='w-full md:w-auto' type='button' variant='icon'>
                      <Edit size={14} />
                      Chỉnh sửa trang cá nhân
                    </AppButton>
                  </>
                ) : (
                  <>
                    {!iscurrentUserBeFriendThisUser ? (
                      <AppButton
                        className='w-full md:w-auto'
                        onClick={() => sendFriendRequest(currentUser!.uid, profile.uid)}
                        type='button'>
                        <Plus size={14} />
                        Gửi lời mời kết bạn
                      </AppButton>
                    ) : null}
                    <AppButton className='w-full md:w-auto' type='button' variant='icon'>
                      <Edit size={14} />
                      Theo dõi
                    </AppButton>
                  </>
                )}
              </div>
            </div>

            {/* divider */}
            <AppDivider className='mt-3' />
          </div>
        </div>
      </div>
      {/* tabs */}
      <AppTabs className='w-full' defaultValue='posts'>
        <div className='h-header bg-white'>
          <AppTabsList>
            {tabs.map((tab, i) => {
              return (
                <AppTabsTrigger key={i} value={tab.value}>
                  {tab.label}
                </AppTabsTrigger>
              );
            })}
          </AppTabsList>
        </div>
        {tabs.map((tab, i) => {
          const Content = tab.comp;
          return (
            <AppTabsContent key={i} value={tab.value}>
              <div className='flex justify-center'>
                <div className='flex w-full flex-col gap-2 md:w-[800px] lg:w-[980px]'>
                  <Content />
                </div>
              </div>
            </AppTabsContent>
          );
        })}
      </AppTabs>
    </section>
  );
}
