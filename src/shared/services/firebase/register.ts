import { createUserWithEmailAndPassword } from 'firebase/auth';
import { RegisterType } from 'src/app/(pages)/(public)/register/components/FormRegister';
import { auth } from 'src/shared/services/firebase/config';

export const registerAuth = async (data: RegisterType) => {
  const { account, password } = data;
  return await createUserWithEmailAndPassword(auth, account, password);
};
