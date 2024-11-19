type User = {
  avatar: string;
  dateOfBirth: {
    day: number;
    month: number;
    year: number;
  };
  email: string;
  firstName: string;
  gender: 'female' | 'male';
  id: string;
  loginTry: number;
  password?: string;
  surname: string;
};

type RequiredUserKey = OptionalExceptFor<User, 'avatar' | 'firstName' | 'id' | 'surname'>;
