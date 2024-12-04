import { addDoc, collection, getFirestore, serverTimestamp } from 'firebase/firestore';

export const sendNotification = async (receiverId: string, message: string, type: string, actorUid: string) => {
  const db = getFirestore();
  const NotificationRef = collection(db, 'userNotifications');
  try {
    await addDoc(NotificationRef, {
      actorUid: actorUid,
      createdAt: serverTimestamp(),
      isRead: false,
      message: message,
      type: type,
      uid: receiverId,
    });
  } catch (error) {
    console.error('Error sending notification: ', error);
  }
};
