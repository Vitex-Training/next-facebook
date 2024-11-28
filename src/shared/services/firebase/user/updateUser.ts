import { doc, setDoc } from 'firebase/firestore';
import { UserInfo } from 'src/shared/types/user';
import { getCollectionRef } from 'src/shared/utils/getCollectionRef';

export async function updateUser(docId: string, updatedInfo: Partial<UserInfo>) {
  const usersRef = getCollectionRef<UserInfo>('users');
  const foundUserRef = doc(usersRef, docId);
  await setDoc(foundUserRef, updatedInfo, { merge: true });
}
