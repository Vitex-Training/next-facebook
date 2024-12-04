import { getDocs, query, where } from 'firebase/firestore';
import { UserInfo } from 'src/shared/types/user';
import { getCollectionRef } from 'src/shared/utils/getCollectionRef';

export async function getUserDocRefByEmail(email: UserInfo['email']) {
  const q = query(getCollectionRef<UserInfo>('users'), where('email', '==', email));
  const querySnapshot = await getDocs(q);

  const docRef = querySnapshot.docs[0];

  return docRef;
}
