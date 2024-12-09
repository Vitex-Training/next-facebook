import { getDocs, query } from 'firebase/firestore';
import { UserInfo } from 'src/shared/types/user';
import { getCollectionRef } from 'src/shared/utils/getCollectionRef';

export async function filterUsersIncludeDeactivate(filterFn: (user: UserInfo) => boolean) {
  const q = query(getCollectionRef<UserInfo>('users'));
  const querySnapshot = await getDocs(q);

  const filteredDocs = querySnapshot.docs.filter((doc) => {
    const data = doc.data();
    return filterFn(data);
  });

  const filteredUsers = filteredDocs.map((filteredDoc) => filteredDoc.data());

  return filteredUsers;
}
