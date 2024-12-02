import { Timestamp } from 'firebase/firestore';

import { UserInfo } from './user';

export interface UserNotification {
  createdAt: Timestamp;
  id: string;
  message: string;
  status: 'read' | 'unread';
  uid: UserInfo['uid'];
}
