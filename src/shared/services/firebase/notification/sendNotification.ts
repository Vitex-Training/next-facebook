import { addDoc, collection, getFirestore, serverTimestamp } from 'firebase/firestore';

export const sendNotification = async (receiverUid: string, message: string, type: string, senderUid: string) => {
  const db = getFirestore();
  const NotificationRef = collection(db, 'notifications');
  console.log('call notification function');
  try {
    await addDoc(NotificationRef, {
      createdAt: serverTimestamp(),
      isRead: false,
      message: message,
      receiverUid: receiverUid,
      senderUid: senderUid,
      type: type,
    });
  } catch (error) {
    console.error('Error sending notification: ', error);
  }
};
