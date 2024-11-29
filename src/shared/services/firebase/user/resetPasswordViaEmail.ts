import { FirebaseError } from 'firebase/app';
import { sendPasswordResetEmail } from 'firebase/auth';

import { auth } from '../config';
import { findUserInStoreByEmail } from './findUserByEmail';

export const resetPasswordViaEmail = async (email: string) => {
  try {
    const user = await findUserInStoreByEmail(email);
    if (!user) {
      throw new Error(`Cannot find use with email ${email}`);
    }
    // send email to reset user's password
    try {
      await sendPasswordResetEmail(auth, email);
      return { email };
    } catch (error) {
      if (error instanceof FirebaseError) {
        throw new Error(`Firebase error when sending email to ${email}: ${error.message}`);
      } else throw new Error(`Unknown error when sending email to ${email}`);
    }
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      throw new Error(`Firebase error when finding user with email ${email}: ${error.message}`);
    } else throw new Error(`Unknown error when finding user with email ${email}`);
  }
};
