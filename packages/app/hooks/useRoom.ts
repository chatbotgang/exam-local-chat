import { useCallback } from "react";
import { useLocalStorage } from "usehooks-ts";

import { Room } from "../models/room";
import { User } from "../models/user";

export const useRoom = () => {
  const [room, setRoom] = useLocalStorage<Room>("room", {});

  const handleLeaveRoom = useCallback(
    (user: User) => {
      setRoom((prevRoom) => {
        Reflect.deleteProperty(prevRoom, user.username);
        return prevRoom;
      });
    },
    [setRoom],
  );

  const handleJoinRoom = useCallback(
    (user: User) => {
      setRoom((prevRoom) => ({ ...prevRoom, [user.username]: user }));
    },
    [setRoom],
  );

  return { handleLeaveRoom, handleJoinRoom, room };
};
