import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { RegisterType } from 'src/app/(pages)/(public)/register/components/FormRegister';
import { auth, db } from 'src/shared/services/firebase/config';
import { UserInfo } from 'src/shared/types/User';

export const registerAuth = async (data: RegisterType) => {
  try {
    const { account, date, password, ...rest } = data;
    const userCredential = await createUserWithEmailAndPassword(auth, account, password);
    const { uid } = userCredential.user;
    const newFormatData: UserInfo = {
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
  } catch (error) {
    return Promise.reject(error);
  }
};
