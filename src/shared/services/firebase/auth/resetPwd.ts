import { FirebaseError } from 'firebase/app';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { ResetPasswordFormType } from 'src/app/(pages)/(private)/reset-password/page';
import { auth } from 'src/shared/services/firebase/config';

export const resetPwd = async (data: ResetPasswordFormType) => {
  const user = auth.currentUser;

  if (!user) throw new Error('Unauthorization');
  // Re-authenticate a user
  const credential = EmailAuthProvider.credential(user.email!, data.currentPassword);
  try {
    await reauthenticateWithCredential(user, credential);
    try {
      await updatePassword(user!, data.newPassword);
    } catch (error) {
      if (error instanceof FirebaseError) {
        throw new Error('Update password failed');
      } else {
        throw new Error('Unknown error');
      }
    }
  } catch (error) {
    if (error instanceof FirebaseError) {
      const cusError = new Error('Current password is incorrect. Please try again.');
      cusError.name = 'invalid-current-password';
      throw cusError;
    } else {
      throw new Error('Unknown error');
    }
  }
};
