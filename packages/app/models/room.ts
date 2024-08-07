import { User } from "./user";

export type Room = {
  [username: string]: User;
};
