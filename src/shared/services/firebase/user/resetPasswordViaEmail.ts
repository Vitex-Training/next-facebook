import { FirebaseError } from 'firebase/app';
import { sendPasswordResetEmail } from 'firebase/auth';

import { auth } from '../config';
import { findUserInStoreByEmail } from './findUserByEmail';

const ERROR_MESSAGES = {
  FIREBASE_FIND_ERROR: (email: string, message: string) =>
    `Firebase error when finding user with email ${email}: ${message}`,
  FIREBASE_RESET_ERROR: (email: string, message: string) =>
    `Firebase error when sending password reset email to ${email}: ${message}`,
  UNKNOWN_FIND_ERROR: (email: string) => `Unknown error when finding user with email ${email}`,
  UNKNOWN_RESET_ERROR: (email: string) => `Unknown error when sending password reset email to ${email}`,
  USER_NOT_FOUND: (email: string) => `Cannot find user with email: ${email}`,
};

export const resetPasswordViaEmail = async (email: string) => {
  try {
    const user = await findUserInStoreByEmail(email);
    if (!user) {
      throw new Error(ERROR_MESSAGES.USER_NOT_FOUND(email));
    }

    // Send email to reset user's password
    await sendPasswordResetEmail(auth, email);
    return { email };
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      if (error.code.startsWith('auth/')) {
        throw new Error(ERROR_MESSAGES.FIREBASE_RESET_ERROR(email, error.message));
      }
      throw new Error(ERROR_MESSAGES.FIREBASE_FIND_ERROR(email, error.message));
    }

    if (error instanceof Error && error.message.includes('Cannot find user')) {
      throw error; // Re-throw the user-not-found error.
    }

    // Handle any other unknown error
    throw new Error(ERROR_MESSAGES.UNKNOWN_FIND_ERROR(email));
  }
};
