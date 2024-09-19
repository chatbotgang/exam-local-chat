import { useEffect, useState } from "react";
import { StorageType, getFromStorage, setToStorage } from "../utils/storage";

function useStorage<T>(
  key: string,
  initialValue: T,
  storageType: StorageType = StorageType.Local,
) {
  const [storedValue, setStoredValue] = useState(() => {
    return getFromStorage(key, storageType) ?? initialValue;
  });

  useEffect(() => {
    setToStorage(key, storedValue, storageType);
  }, [key, storedValue, storageType]);

  return [storedValue, setStoredValue];
}

export default useStorage;
