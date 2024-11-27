import { FirebaseError } from 'firebase/app';
import { browserSessionPersistence, setPersistence, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { LoginFormType } from 'src/app/(pages)/(public)/login/page';
import { auth } from 'src/shared/services/firebase/config';

import { getUserDocRefByEmail } from '../user/getUserDocRefByEmail';
import { updateUser } from '../user/updateUser';

export const login = async (data: LoginFormType) => {
  const { email, password } = data;
  try {
    // login the user
    await setPersistence(auth, browserSessionPersistence);
    await signInWithEmailAndPassword(auth, email, password);

    // update the deactive field to none
    const userDocRef = await getUserDocRefByEmail(email);
    if (userDocRef?.id) {
      await updateUser(userDocRef.id, { deactive: 'none' });
      const userInfo = userDocRef.data();

      return userInfo;
    }
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      const errorCode = error.code;
      const stringCode = errorCode.split('/')[1];
      let errorMessage = error.message;
      switch (stringCode) {
        case 'invalid-credential':
          errorMessage = 'Password is not valid';
          break;
        case 'invalid-email':
          errorMessage = 'Email is not valid';
          break;
        case 'missing-password':
          errorMessage = 'Password is required';
          break;
        default:
          errorMessage = 'Password and Email is not valid';
          break;
      }
      throw new Error(errorMessage);
    } else {
      throw new Error('Unknown error');
    }
  }
};
export const logout = async () => {
  await signOut(auth);
};
