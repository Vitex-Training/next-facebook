import { Timestamp } from 'firebase/firestore';

import { UserInfo } from './user';

export interface UserFollower {
  createdAt: Timestamp;
  followerUids: UserInfo['uid'][];
  uid: UserInfo['uid'];
  updatedAt: Timestamp;
}
