import { createContext } from "react";

type CurrentUserContextType = {
  currentUser: string | null;
  login: (name: string) => void;
};
export const CurrentUserContext = createContext<CurrentUserContextType | null>(
  null,
);
