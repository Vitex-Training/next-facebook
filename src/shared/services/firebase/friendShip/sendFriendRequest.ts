import { UserInfo } from 'src/shared/types/user';

export default function sendFriendRequest(senderUid: UserInfo['uid'], receiverUid: UserInfo['uid']) {
  return { receiverUid, senderUid };
}
