import { FileLinkType } from './general';

export interface UserInfo {
  avatar?: string;
  coverPhoto?: FileLinkType;
  dateOfBirth: string;
  deactivate: boolean;
  email: string;
  firstName: string;
  gender: 'female' | 'male';
  surname: string;
  uid: string;
}
