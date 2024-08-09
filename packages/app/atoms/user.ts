import { atomWithStorage, createJSONStorage } from "jotai/utils";

const sessionStorage = createJSONStorage<string>(() => window.sessionStorage);
export const usernameAtom = atomWithStorage<string>(
  "username",
  "",
  sessionStorage,
);

const localStorage = createJSONStorage<string[]>(() => window.localStorage);
export const uesrsAtom = atomWithStorage<string[]>(
  "participants",
  [],
  localStorage,
);
