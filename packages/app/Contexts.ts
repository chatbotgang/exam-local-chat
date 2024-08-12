import { createContext } from "react";

type CurrentUserContextType = {
  currentUser: string;
  login: (name: string) => void;
};
export const CurrentUserContext = createContext<CurrentUserContextType | null>(
  null,
);
