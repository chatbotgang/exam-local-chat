import { createContext, Dispatch, SetStateAction } from "react";

export const ColorModeContext = createContext<
  ["light" | "dark", Dispatch<SetStateAction<"light" | "dark">>]
>(["dark", () => {}]);
