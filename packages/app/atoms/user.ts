import { atomWithStorage, createJSONStorage } from "jotai/utils";

const sessionStorage = createJSONStorage(() => window.sessionStorage);
export const usernameAtom = atomWithStorage("username", "", sessionStorage);
