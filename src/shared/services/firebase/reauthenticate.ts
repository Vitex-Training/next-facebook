/* eslint-disable no-console */
import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { auth } from 'src/shared/services/firebase/config';

export const reauthenticateAuth = async (password: string) => {
  const user = auth.currentUser;
  if (!user || !user.email) {
    throw new Error('There is no user');
  }
  try {
    const credential = EmailAuthProvider.credential(user.email, password);
    await reauthenticateWithCredential(user, credential);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
