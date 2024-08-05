import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

type StorageType = "local" | "session";

const getStorage = (type: StorageType) => {
  return type === "local" ? window.localStorage : window.sessionStorage;
};

const createStorageAtom = <T>(
  key: string,
  initialValue: T,
  storage: Storage,
) => {
  return atomWithStorage<T>(key, initialValue, {
    getItem: (key) => {
      const item = storage.getItem(key);
      return (item ? JSON.parse(item) : null) as T;
    },
    setItem: (key, value) => {
      storage.setItem(key, JSON.stringify(value));
    },
    removeItem: (key) => {
      storage.removeItem(key);
    },
  });
};

function useStorage<T>(
  key: string,
  initialValue: T,
  type: StorageType = "local",
) {
  const storage = getStorage(type);
  const storageAtom = createStorageAtom(key, initialValue, storage);
  const [value, setValue] = useAtom(storageAtom);

  return [value, setValue] as const;
}

export default useStorage;
