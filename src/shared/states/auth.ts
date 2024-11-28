import { atom } from 'jotai';
import { UserInfo } from 'src/shared/types/user';

export const currUserAtom = atom<undefined | UserInfo>(undefined);
