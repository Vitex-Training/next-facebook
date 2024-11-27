import { getDocs, query, where } from 'firebase/firestore';
import { User } from 'src/shared/types/user';

import { UserCollection } from './userCollection';

// Get the Auth service for the default app

export async function findUserInStoreByEmail(email: string): Promise<null | User> {
  const queryUser = query(UserCollection, where('email', '==', email));
  const foundUsers = await getDocs(queryUser);
  if (foundUsers.docs.length) {
    return foundUsers.docs[0]?.data() as User;
  } else return null;
}
