export enum StorageType {
  Local = "local",
  Session = "session",
}

const getStorage = (type: StorageType): Storage => {
  return type === StorageType.Local ? localStorage : sessionStorage;
};

export const getStorageKey = (key: string) => `local-chat-${key}`;

export const getFromStorage = (
  key: string,
  type: StorageType = StorageType.Local,
) => {
  const storage = getStorage(type);
  const item = storage.getItem(getStorageKey(key));
  return item ? JSON.parse(item) : null;
};

export const setToStorage = (
  key: string,
  value: any,
  type: StorageType = StorageType.Local,
) => {
  const storage = getStorage(type);
  storage.setItem(getStorageKey(key), JSON.stringify(value));
};
