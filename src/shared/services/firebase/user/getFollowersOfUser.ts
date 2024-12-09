import { getDocs, query, where } from 'firebase/firestore';
import { UserInfo } from 'src/shared/types/user';
import { UserFollower } from 'src/shared/types/userFollower';
import { getCollectionRef } from 'src/shared/utils/getCollectionRef';

import { filterUsersIncludeDeactivate } from './filterUsersIncludeDeactivate';

export async function getFollowersOfUser(uid: UserInfo['uid']) {
  const q = query(getCollectionRef<UserFollower>('followers'), where('uid', '==', uid));
  const querySnapshot = await getDocs(q);

  const foundData = querySnapshot.docs[0]?.data();

  if (!foundData) return [];

  const followerUids = foundData.followerUids;
  const filterFn = (user: UserInfo) =>
    !!followerUids.find((followerUid) => {
      return followerUid === user.uid;
    });

  const filteredUsers = await filterUsersIncludeDeactivate(filterFn);

  return filteredUsers;
}
