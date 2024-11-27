import { collection } from 'firebase/firestore';

import { AppFireStore } from './appFirestore';

export const UserCollection = collection(AppFireStore, 'users');
