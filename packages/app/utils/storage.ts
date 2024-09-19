import { StorageType } from "../types";

const getStorage = (type: StorageType): Storage => {
  return type === StorageType.Local ? localStorage : sessionStorage;
};

export const getFromStorage = (
  key: string,
  type: StorageType = StorageType.Local,
): any => {
  const storage = getStorage(type);
  const item = storage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export const setToStorage = (
  key: string,
  value: any,
  type: StorageType = StorageType.Local,
) => {
  const storage = getStorage(type);
  storage.setItem(key, JSON.stringify(value));
};
