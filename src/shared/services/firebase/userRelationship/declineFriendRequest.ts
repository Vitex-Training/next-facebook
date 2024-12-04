import { addDoc, collection, doc, getFirestore, serverTimestamp, setDoc } from 'firebase/firestore';

export const declineFriendRequest = async (senderId: string, receiverId: string) => {
  const db = getFirestore();

  // Reference to the relationship document
  const sendUserRelationshipRef = doc(db, 'userRelationships', `${senderId}_${receiverId}`);
  const receiveUserRelationshipRef = doc(db, 'userRelationships', `${receiverId}_${senderId}`);
  try {
    // Delete the friend request (decline)
    await setDoc(
      sendUserRelationshipRef,
      {
        status: 'none',
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    );
    await setDoc(
      receiveUserRelationshipRef,
      {
        isFollowing: false,
        status: 'none',
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    );

    // Optionally, send a notification about the declined request
    await addDoc(collection(db, 'notifications'), {
      createdAt: serverTimestamp(),
      isRead: false,
      message: `You declined the friend request from ${senderId}`,
      type: 'friend-declined',
      userId: receiverId,
    });

    console.log('Friend request declined!');
  } catch (error) {
    console.error('Error declining friend request: ', error);
  }
};
