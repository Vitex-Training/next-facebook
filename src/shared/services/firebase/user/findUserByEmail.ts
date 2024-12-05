import { FirebaseError } from 'firebase/app';
import { getDocs, query, where } from 'firebase/firestore';
import { UserInfo } from 'src/shared/types/user';
import { getCollectionRef } from 'src/shared/utils/getCollectionRef';

const UserCollection = getCollectionRef<UserInfo>('users');

// Get the Auth service for the default app

export async function findUserInStoreByEmail(email: string): Promise<undefined | UserInfo> {
  try {
    const queryUser = query(UserCollection, where('email', '==', email));
    const foundUsers = await getDocs(queryUser);
    if (foundUsers.docs.length) {
      return foundUsers.docs[0]?.data();
    } else return undefined;
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      throw new Error(`Error in Firebase when finding user with email: ${error.message}`);
    }
    throw new Error(`Unknown error when finding user with email`);
  }
}
