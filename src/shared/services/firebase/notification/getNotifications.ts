import { getDocs, query, where } from 'firebase/firestore';
import { Notification, NotificationFilterType } from 'src/shared/types/notification';
import { UserInfo } from 'src/shared/types/user';
import { getCollectionRef } from 'src/shared/utils/getCollectionRef';

import { getUserInfoByUid } from '../user/getUserInfoByUid';

export async function getNotifications(uid: UserInfo['uid'], filter: NotificationFilterType) {
  const q = query(getCollectionRef<Notification>('notifications'), where('receiverUid', '==', uid));
  const querySnapshot = await getDocs(q);

  const filteredNotificationDocs = querySnapshot.docs.filter((doc) => {
    const data = doc.data();
    if (filter === 'all') return data;
    if (filter === 'read') return data.isRead;
    return !data.isRead;
  });

  const filteredUsers = await Promise.all(
    filteredNotificationDocs.map(async (notificationDoc) => {
      const notification = notificationDoc.data();
      const uid = notification.senderUid;
      const senderInfo = await getUserInfoByUid(uid);

      return { ...notification, senderInfo: senderInfo! };
    }),
  );

  return filteredUsers;
}
