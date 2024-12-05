import { Timestamp } from 'firebase/firestore';

import { UserInfo } from './user';

export interface Notification {
  createdAt: Timestamp;
  isRead: boolean;
  message: string;
  receiverUid: UserInfo['uid'];
  senderUid: UserInfo['uid'];
  // normal for only message, friend-request form notification about a friend request
  type: 'friend-request' | 'normal';
  updatedAt: Timestamp;
}
