import { createUserWithEmailAndPassword } from 'firebase/auth';
import { RegisterType } from 'src/app/(pages)/(public)/(auth)/register/components/FormRegister';
import { auth } from 'src/app/services/firebase';

export const registerAuth = async (data: RegisterType) => {
  const { account, password } = data;
  createUserWithEmailAndPassword(auth, account, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
};
