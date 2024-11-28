import { collection, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { auth, db } from 'src/shared/services/firebase/config';

export const deactivateUserAuth = async () => {
  if (!auth.currentUser) {
    throw new Error();
  }
  const q = query(collection(db, 'users'), where('uid', '==', auth.currentUser.uid));
  const querySnapshot = await getDocs(q);
  const userDoc = querySnapshot.docs[0];
  if (!userDoc) {
    throw new Error('Cannnot find user');
  }
  await updateDoc(userDoc.ref, { deactivate: true });
};
