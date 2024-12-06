import { Timestamp } from 'firebase/firestore';

import { UserInfo } from './user';

export interface FriendShip {
  createdAt: Timestamp;
  receiverUid: UserInfo['uid'];
  senderUid: UserInfo['uid'];
  status: 'accepted' | 'blocked' | 'declined' | 'pending';
  updatedAt: Timestamp;
}
