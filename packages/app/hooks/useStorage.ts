import { useEffect, useState } from "react";
import type { StorageKey } from "../types";
import { StorageType } from "../types";
import { getFromStorage, setToStorage } from "../utils/storage";

function useStorage(
  key: StorageKey,
  storageType: StorageType = StorageType.Local,
) {
  const [storedValue, setStoredValue] = useState(() => {
    return getFromStorage(key, storageType) ?? "";
  });

  useEffect(() => {
    setToStorage(key, storedValue, storageType);
  }, [key, storedValue, storageType]);

  return [storedValue, setStoredValue];
}

export default useStorage;
