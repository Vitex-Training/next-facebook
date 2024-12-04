import { doc, getFirestore, serverTimestamp, setDoc } from 'firebase/firestore';

import { sendNotification } from './sendNotification';

export const sendFriendRequest = async (uid: string, targetUid: string) => {
  const db = getFirestore();

  // Check if a relationship already exists
  const userRelationshipRef = doc(db, 'userRelationships', `${uid}_${targetUid}`);

  try {
    // Add friend request to the userRelationships collection
    await setDoc(userRelationshipRef, {
      createdAt: serverTimestamp(),
      isFollowing: true,
      status: 'pending', // Request is pending
      targetUid: targetUid,
      uid: uid,
      updatedAt: serverTimestamp(),
    });

    // Create a notification for the receiver about the friend request
    sendNotification(targetUid, `You have a new friend request from ${uid}`, 'friendRequest', targetUid);

    console.log('Friend request sent successfully!');
  } catch (error) {
    console.error('Error sending friend request: ', error);
  }
};
