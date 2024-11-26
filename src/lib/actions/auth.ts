import { FirebaseError } from 'firebase/app';
import { browserSessionPersistence, setPersistence, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { LoginFormType } from 'src/app/(pages)/(public)/(auth)/login/page';
import { auth } from 'src/services/firebase';
export const login = async (data: LoginFormType) => {
  const { email, password } = data;
  try {
    await setPersistence(auth, browserSessionPersistence);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user;
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
