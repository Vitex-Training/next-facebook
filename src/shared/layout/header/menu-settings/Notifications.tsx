'use client';

import { useQuery } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { vi as vnLocale } from 'date-fns/locale';
import { useAtomValue } from 'jotai';
import { Dot, Ellipsis, MessageCircleMore } from 'lucide-react';
import { useState } from 'react';
import { AppAvatar, AppAvatarImage } from 'src/shared/components/avatar/AppAvatar';
import { AppBadgeSticker, AppBadgeStickerContent } from 'src/shared/components/badge-sticker/AppBadgeSticker';
import { AppButton } from 'src/shared/components/button/AppButton';
import { AppTabs, AppTabsContent, AppTabsList, AppTabsTrigger } from 'src/shared/components/tabs/AppTabs';
import acceptFriendRequest from 'src/shared/services/firebase/friendShip/acceptFriendRequest';
import declineFriendRequest from 'src/shared/services/firebase/friendShip/declineFriendRequest';
import { getNotifications } from 'src/shared/services/firebase/notification/getNotifications';
import { currUserAtom } from 'src/shared/states/auth';
import { TabItem } from 'src/shared/types/general';
import { NotificationFilterType } from 'src/shared/types/notification';
import { getFullName } from 'src/shared/utils/getFullName';

const filterOptions: TabItem<NotificationFilterType>[] = [
  {
    label: 'Tất cả',
    value: 'all',
  },
  {
    label: 'Chưa đọc',
    value: 'unread',
  },
];

export default function Notifications() {
  const currUser = useAtomValue(currUserAtom);
  const [tab, setTab] = useState<NotificationFilterType>(filterOptions[0]!.value!);

  const { data } = useQuery({
    enabled: !!currUser?.uid,
    queryFn: async () => {
      const notifications = await getNotifications(currUser!.uid, tab);

      return notifications;
    },
    queryKey: ['notifications', currUser!.uid, { filterType: tab }],
  });

  const onTabChange = (value: string) => {
    setTab(value as NotificationFilterType);
  };

  return (
    <div className='flex w-[calc(100vw-2rem)] flex-col gap-2 md:w-[360px]'>
      <div className='flex items-center justify-between'>
        <div className='text-lg font-bold'>Thông báo</div>
        <AppButton size='small-icon' type='button' variant='small-icon'>
          <Ellipsis />
        </AppButton>
      </div>
      {/* filter btn */}
      <AppTabs defaultValue='all' onValueChange={(value) => onTabChange(value)} value={tab}>
        <AppTabsList className='flex justify-start'>
          {filterOptions.map((filterOption, i) => {
            return (
              <AppTabsTrigger className='flex-none rounded-full before:hidden' key={i} value={filterOption.value}>
                {filterOption.label}
              </AppTabsTrigger>
            );
          })}
        </AppTabsList>
        {filterOptions.map((filterOption, i) => {
          return (
            <AppTabsContent key={i} value={filterOption.value}>
              {!data?.length ? (
                <p>You dont have any notification</p>
              ) : (
                <ul>
                  {data.map((notification, i) => {
                    return (
                      <li className='flex items-center justify-between gap-2 rounded-md p-2 hover:bg-lightgray' key={i}>
                        <div className='flex items-center justify-start gap-2'>
                          <AppBadgeSticker>
                            <AppBadgeStickerContent className='rounded-full bg-primary'>
                              <MessageCircleMore color='white' size={16} />
                            </AppBadgeStickerContent>
                            <AppAvatar className='size-14'>
                              <AppAvatarImage
                                alt={getFullName(notification.senderInfo)}
                                src={notification.senderInfo.avatar}
                              />
                            </AppAvatar>
                          </AppBadgeSticker>

                          <div className='flex flex-col gap-1'>
                            <div>
                              <span className='line-clamp-1 font-semibold [word-break:break-word]'>
                                {getFullName(notification.senderInfo)}:
                              </span>
                              <span className='[word-break:break-word]'>{notification.message}</span>
                            </div>
                            <div className='text-up-xs text-primary'>
                              {formatDistanceToNow(notification.createdAt.toDate(), { locale: vnLocale })}
                            </div>

                            {notification.type === 'friend-request' ? (
                              <div className='flex items-center gap-2'>
                                <AppButton
                                  className='flex-1'
                                  onClick={() => declineFriendRequest(notification.senderUid, currUser!.uid)}
                                  type='button'
                                  variant='icon'>
                                  Từ chối
                                </AppButton>
                                <AppButton
                                  className='flex-1'
                                  onClick={() => acceptFriendRequest(notification.senderUid, currUser!.uid)}
                                  type='button'>
                                  Chấp nhận
                                </AppButton>
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className={notification.isRead ? 'hidden' : ''}>
                          <Dot color='red' />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </AppTabsContent>
          );
        })}
      </AppTabs>
    </div>
  );
}
