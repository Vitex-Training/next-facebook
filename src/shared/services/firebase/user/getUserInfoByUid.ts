import { UserInfo } from 'src/shared/types/user';

import { getUserDocRefByUid } from './getUserDocRefByUid';

export async function getUserInfoByUid(uid: UserInfo['uid']) {
  const docRef = await getUserDocRefByUid(uid);

  return docRef?.data();
}
