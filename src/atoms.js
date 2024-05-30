import { atom } from 'recoil';

export const selectedFileState = atom({
  key: 'selectedFileState',
  default: null,
});

export const imageURLState = atom({
  key: 'imageURLState',
  default: '',
});

export const errorState = atom({
  key: 'errorState',
  default: '',
});

export const uploadingState = atom({
  key: 'uploadingState',
  default: false,
});
