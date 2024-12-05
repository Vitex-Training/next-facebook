import { doc, getFirestore, serverTimestamp, setDoc } from 'firebase/firestore';

import { sendNotification } from '../notification/sendNotification';

export const sendFriendRequest = async (senderUid: string, receiverUid: string) => {
  const db = getFirestore();

  // Check if a relationship already exists
  const userRelationshipRef = doc(db, 'friendShips', `${senderUid}_${receiverUid}`);

  try {
    // Add friend request to the userRelationships collection
    await setDoc(userRelationshipRef, {
      createdAt: serverTimestamp(),
      receiverUid: receiverUid,
      senderUid: senderUid,
      status: 'pending', // Request is pending
      updatedAt: serverTimestamp(),
    });

    // Create a notification for the receiver about the friend request
    sendNotification(receiverUid, `You have a new friend request from ${senderUid}`, 'friendRequest', receiverUid);

    console.log('Friend request sent successfully!');
  } catch (error) {
    console.error('Error sending friend request: ', error);
  }
};
