import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { UserRelationship } from 'src/shared/types/UserRelationship';

import { auth, db } from './config';

export const followUser = async (uidFollow: string) => {
  try {
    if (!auth.currentUser) {
      throw new Error();
    }
    const newData: UserRelationship = {
      createdAt: Timestamp.now(),
      isFollowing: true,
      status: 'none',
      targetUid: uidFollow,
      uid: auth.currentUser.uid,
      updatedAt: Timestamp.now(),
    };
    const docRef = await addDoc(collection(db, 'userRelationships'), newData);
    return docRef.id;
  } catch (error) {
    return Promise.reject(error);
  }
};
