import { addDoc, collection, doc, getFirestore, serverTimestamp, setDoc } from 'firebase/firestore';

export const acceptFriendRequest = async (senderId: string, receiverId: string) => {
  const db = getFirestore();

  // Reference to the relationship document
  const sendUserRelationshipRef = doc(db, 'userRelationships', `${senderId}_${receiverId}`);
  const receiveUserRelationshipRef = doc(db, 'userRelationships', `${receiverId}_${senderId}`);
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
    await setDoc(receiveUserRelationshipRef, {
      createdAt: serverTimestamp(),
      isFollowing: true,
      status: 'accepted',
      targetUid: senderId,
      uid: receiverId,
      updatedAt: serverTimestamp(),
    });

    // Optionally, you can add a notification to both users
    // For the sender
    await addDoc(collection(db, 'userNotifications'), {
      createdAt: serverTimestamp(),
      isRead: false,
      message: `${receiverId} accepted your friend request`,
      userId: senderId,
    });

    // For the receiver (confirmation)
    await addDoc(collection(db, 'userNotifications'), {
      createdAt: serverTimestamp(),
      isRead: false,
      message: `You and ${senderId} are now friends`,
      uid: receiverId,
    });

    console.log('Friend request accepted!');
  } catch (error) {
    console.error('Error accepting friend request: ', error);
  }
};
