import { useEffect, useState } from "react";
import type { StorageKey } from "../types";
import { StorageType } from "../types";
import { getFromStorage, setToStorage } from "../utils/storage";

function useStorage<T>(
  key: StorageKey,
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
