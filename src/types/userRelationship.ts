import { Timestamp } from 'firebase/firestore';

import { UserInfo } from './user';

export interface UserRelationship {
  createdAt: Timestamp; // Timestamp when the relationship was created
  id: string;
  isFollowing: boolean; // Follow status: true if following, false if not
  status: 'accepted' | 'blocked' | 'declined' | 'none' | 'pending'; // Relationship status
  targetUid: UserInfo['uid']; // ID of the target user
  uid: UserInfo['uid']; // ID of the user initiating the relationship
  updatedAt: Timestamp; // Timestamp when the relationship was last updated
}
