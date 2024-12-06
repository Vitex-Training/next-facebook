import { atom } from 'jotai';
import { UserInfo } from 'src/shared/types/user';

export const currentUserAtom = atom<undefined | UserInfo>(undefined);
