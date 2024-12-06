import { QueryDocumentSnapshot, Timestamp } from 'firebase/firestore';

import { Group } from './group';
import { UserInfo } from './user';

export interface UserGroup {
  createdAt: Timestamp;
  groupDocId: QueryDocumentSnapshot<Group, Group>['id'];
  role: 'admin' | 'normal';
  status: 'accepted' | 'ban' | 'declined' | 'pending';
  uid: UserInfo['uid'];
  updatedAt: Timestamp;
}
