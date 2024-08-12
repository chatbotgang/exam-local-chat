import { useCallback, useEffect, useRef, useState } from "react";

export type UseBroadcastChannelOptions = {
  name: string;
};

export type UseBroadcastChannelReturn<D, P> = {
  channel: BroadcastChannel | undefined;
  data: D | undefined;
  post: (data: P) => void;
  close: () => void;
  error: Event | null;
  isClosed: boolean;
};

export function useBroadcastChannel<D, P>(
  options: UseBroadcastChannelOptions,
): UseBroadcastChannelReturn<D, P> {
  const { name } = options;
  const [isClosed, setIsClosed] = useState(false);
  const [data, setData] = useState<D | undefined>();
  const [error, setError] = useState<Event | null>(null);

  const channelRef = useRef<BroadcastChannel | undefined>();

  const post = useCallback((data: P) => {
    if (channelRef.current) {
      channelRef.current.postMessage(data);
    }
  }, []);

  const close = useCallback(() => {
    if (channelRef.current) {
      channelRef.current.close();
    }
    setIsClosed(true);
  }, []);

  useEffect(() => {
    channelRef.current = new BroadcastChannel(name);
    setError(null);

    const handleMessage = (e: MessageEvent) => {
      setData(e.data);
    };

    const handleError = (e: MessageEvent) => {
      setError(e);
    };

    const handleClose = () => {
      setIsClosed(true);
    };

    channelRef.current.addEventListener("message", handleMessage, {
      passive: true,
    });
    channelRef.current.addEventListener("messageerror", handleError, {
      passive: true,
    });
    channelRef.current.addEventListener("close", handleClose);

    return () => {
      if (channelRef.current) {
        channelRef.current.removeEventListener("message", handleMessage);
        channelRef.current.removeEventListener("messageerror", handleError);
        channelRef.current.removeEventListener("close", handleClose);
        close();
      }
    };
  }, [name, close]);

  return {
    channel: channelRef.current,
    data,
    post,
    close,
    error,
    isClosed,
  };
}
