import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useMemo } from "react";

type StorageType = "local" | "session";

const getStorage = (type: StorageType) => {
  return type === "local" ? window.localStorage : window.sessionStorage;
};

const createStorageAtom = <T>(
  key: string,
  initialValue: T,
  storage: Storage,
) => {
  return atomWithStorage<T>(
    key,
    initialValue,
    {
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
    },
    {
      getOnInit: true,
    },
  );
};

export default function useStorage<T>(
  key: string,
  initialValue: T,
  type: StorageType = "local",
) {
  const storage = useMemo(() => getStorage(type), [type]);
  const storageAtom = useMemo(
    () => createStorageAtom(key, initialValue, storage),
    [key, storage],
  );
  const [value, setValue] = useAtom(storageAtom);

  return [value, setValue] as const;
}
