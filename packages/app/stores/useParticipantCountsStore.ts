import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ParticipantCountsState {
  participants: { [username: string]: number };
  addParticipant: (username: string) => void;
  removeParticipant: (username: string) => void;
  checkIsFirstJoin: (username: string) => boolean;
  checkIsLastLeave: (username: string) => boolean;
}

const useParticipantCountsStore = create<ParticipantCountsState>()(
  persist(
    (set, get) => ({
      participants: {},
      addParticipant: (username) =>
        set((state) => {
          const currentCount = state.participants[username] || 0;
          const newCount = currentCount + 1;
          return {
            participants: {
              ...state.participants,
              [username]: newCount,
            },
          };
        }),
      removeParticipant: (username) =>
        set((state) => {
          const newParticipants = { ...state.participants };
          const currentCount = newParticipants[username] || 0;
          const newCount = Math.max(currentCount - 1, 0);
          if (newCount === 0) {
            delete newParticipants[username];
          } else {
            newParticipants[username] = newCount;
          }
          return { participants: newParticipants };
        }),
      checkIsFirstJoin: (username) => {
        const count = get().participants[username];
        return count === undefined;
      },
      checkIsLastLeave: (username) => {
        const count = get().participants[username];
        return count === 1;
      },
    }),
    {
      name: "participants-storage",
    },
  ),
);

export default useParticipantCountsStore;
