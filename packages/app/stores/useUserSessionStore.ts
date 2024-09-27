import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserSessionState {
  localUsername: string;
  setLocalUsername: (localUsername: string) => void;
}

const useUserSessionStore = create<UserSessionState>()(
  persist(
    (set) => ({
      localUsername: "",
      setLocalUsername: (localUsername: string) => set({ localUsername }),
    }),
    {
      name: "user-session-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useUserSessionStore;
