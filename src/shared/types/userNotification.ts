import { Timestamp } from 'firebase/firestore';

import { UserInfo } from './user';

export interface UserNotification {
  actorUid: UserInfo['uid'];
  createdAt: Timestamp;
  isRead: boolean;
  message: string;
  type: string;
  uid: UserInfo['uid'];
}
