import { doc, getFirestore, serverTimestamp, setDoc } from 'firebase/firestore';

export const acceptFriendRequest = async (senderUid: string, receiverUid: string) => {
  const db = getFirestore();

  // Reference to the relationship document
  const sendUserRelationshipRef = doc(db, 'friendShips', `${senderUid}_${receiverUid}`);
  try {
    // Update relationship status to 'accepted'
    await setDoc(
      sendUserRelationshipRef,
      {
        status: 'accepted',
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    );

    console.log('Friend request accepted!');
  } catch (error) {
    console.error('Error accepting friend request: ', error);
  }
};
