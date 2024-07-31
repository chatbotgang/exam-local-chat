import { useCallback, useRef } from "react";
import { useBeforeUnload } from "react-router-dom";

export default function useBroadcastChannel<T>(name: string) {
  const channel = useRef(new BroadcastChannel(name));

  useBeforeUnload(
    useCallback(() => {
      channel.current.close();
    }, []),
  );

  const postMessage = useCallback(
    (data: T) => {
      channel.current.postMessage(data);
    },
    [channel],
  );

  const onmessage = useCallback(
    (callback: (data: T) => void) => {
      channel.current.onmessage = (event) => {
        callback(event.data);
      };
    },
    [channel],
  );

  return { postMessage, onmessage };
}
