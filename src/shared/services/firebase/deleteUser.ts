import { deleteUser } from 'firebase/auth';
import { collection, deleteDoc, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from 'src/shared/services/firebase/config';

export const deleteUserAuth = async () => {
  const q = query(collection(db, 'users'), where('uid', '==', auth.currentUser!.uid));
  const querySnapshot = await getDocs(q);
  const userDoc = querySnapshot.docs[0];
  if (!userDoc) {
    throw new Error('Cannnot find user');
  }
  await deleteDoc(userDoc.ref);
  await deleteUser(auth.currentUser!);
};
