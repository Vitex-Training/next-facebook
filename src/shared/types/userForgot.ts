export type UserGender = 'female' | 'male';

export interface User {
  dateOfBirth?: string;
  email: string;
  firstname: string;
  gender?: UserGender;
  surname: string;
  uid: string;
}
export interface UserError {
  error: string;
}
