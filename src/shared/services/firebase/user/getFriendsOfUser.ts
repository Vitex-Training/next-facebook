import { getDocs, query, where } from 'firebase/firestore';
import { FriendShip } from 'src/shared/types/friendShip';
import { UserInfo } from 'src/shared/types/user';
import { getCollectionRef } from 'src/shared/utils/getCollectionRef';

import { filterUsersIncludeDeactivate } from './filterUsersIncludeDeactivate';

export async function getFriendsOfUser(uid: UserInfo['uid']) {
  const q = query(getCollectionRef<FriendShip>('friendShips'), where('status', '==', 'accepted'));
  const querySnapshot = await getDocs(q);

  const filteredDocs = querySnapshot.docs.filter((doc) => {
    const data = doc.data();
    return data.senderUid === uid || data.receiverUid === uid;
  });

  const filterFn = (user: UserInfo) =>
    !!filteredDocs.find((filteredDoc) => {
      const relation = filteredDoc.data();
      const isInRelation =
        (relation.senderUid === user.uid || filteredDoc.data().receiverUid === user.uid) && user.uid !== uid;
      return isInRelation;
    });

  const filteredUsers = await filterUsersIncludeDeactivate(filterFn);

  return filteredUsers;
}
