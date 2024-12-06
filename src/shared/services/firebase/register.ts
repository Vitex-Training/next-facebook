import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { RegisterType } from 'src/app/(pages)/(public)/register/page';
import { auth, db } from 'src/shared/services/firebase/config';

export const register = async (data: RegisterType) => {
  try {
    const { account, date, password, ...rest } = data;
    const userCredential = await createUserWithEmailAndPassword(auth, account, password);
    const { uid } = userCredential.user;
    const newFormatData = {
      ...rest,
      dateOfBirth: `${date.day}/${date.month}/${date.year}`,
      deactivate: false,
      email: data.account,
      password: data.password,
      uid,
    };
    const userDocRef = await addDoc(collection(db, 'users'), newFormatData);
    await sendEmailVerification(userCredential.user);
    return userDocRef;
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      const errorCode = error.code;
      const stringCode = errorCode.split('/')[1];
      let errorMessage = error.message;

      switch (stringCode) {
        case 'email-already-in-use':
          errorMessage = 'This email is already in use. Please try a different one.';
          break;
        default:
          errorMessage = 'An unknown error occurred. Please try again.';
          break;
      }
      throw new Error(errorMessage);
    } else {
      throw new Error('Unknown error');
    }
  }
};
