import { Timestamp } from 'firebase/firestore';
import { UserInfo } from 'src/shared/types/User';

export interface UserRelationship {
  createdAt: Timestamp; // Timestamp when the relationship was created
  isFollowing: boolean; // Follow status: true if following, false if not
  status: 'accepted' | 'blocked' | 'declined' | 'none' | 'pending'; // Relationship status
  targetUid: UserInfo['uid']; // ID of the target user
  uid: UserInfo['uid']; // ID of the user initiating the relationship
  updatedAt: Timestamp; // Timestamp when the relationship was last updated
}
