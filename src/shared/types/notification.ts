import { Timestamp } from 'firebase/firestore';

import { UserInfo } from './user';

export type NotificationFilterType = 'all' | 'read' | 'unread';

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

export interface NotificationExtend extends Notification {
  senderInfo: UserInfo;
}
