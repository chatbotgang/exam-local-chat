import { useRef } from "react";

export const useScroll = () => {
  const ref = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    // scroll after rendering
    ref.current?.scrollTo({
      top: ref.current?.scrollHeight,
    });
  };

  return {
    ref,
    scrollToBottom,
  };
};
