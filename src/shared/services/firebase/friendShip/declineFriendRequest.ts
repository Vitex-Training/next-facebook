import { UserInfo } from 'src/shared/types/user';

export default function declineFriendRequest(senderUid: UserInfo['uid'], receiverUid: UserInfo['uid']) {
  return { receiverUid, senderUid };
}
