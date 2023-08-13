import { atom } from 'jotai';

export const userAtom = atom(null); // 사용자 정보를 담을 Atom
export const selectedPostAtom = atom(null);
export const menuTitleAtom = atom(null);
export const postAtom = atom('', (get, set, newValue) => {
  set(postAtom, newValue);
});
export const bookmarkedPostAtom = atom(null);
