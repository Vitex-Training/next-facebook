import { UserInfo } from '../types/user';

export function getFullName(user: UserInfo) {
  return `${user.firstName} ${user.surname}`;
}
