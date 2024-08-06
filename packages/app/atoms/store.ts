import { errorAtom } from "@/atoms/common";
import { createStore } from "jotai";

export const globalStore = createStore();
globalStore.set(errorAtom, null);
