import { collection, QueryDocumentSnapshot } from 'firebase/firestore';

import { db } from '../services/firebase/config';
const getConverter = <T>() => ({
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as T,
  toFirestore: (data: T) => data,
});

export const getCollectionRef = <T extends object>(path: string) =>
  collection(db, path).withConverter(getConverter<T>());
