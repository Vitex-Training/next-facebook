import { doc, getFirestore, serverTimestamp, setDoc } from 'firebase/firestore';

export const declineFriendRequest = async (senderId: string, receiverId: string) => {
  const db = getFirestore();

  // Reference to the relationship document
  const sendUserRelationshipRef = doc(db, 'friendShips', `${senderId}_${receiverId}`);
  try {
    // Delete the friend request (decline)
    await setDoc(
      sendUserRelationshipRef,
      {
        status: 'declined',
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    );

    console.log('Friend request declined!');
  } catch (error) {
    console.error('Error declining friend request: ', error);
  }
};
