import { useRef } from "react";

export const useScroll = () => {
  const ref = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    // scroll after rendering
    setTimeout(() => {
      ref.current?.scrollTo({
        top: ref.current?.scrollHeight,
      });
    }, 0);
  };

  return {
    ref,
    scrollToBottom,
  };
};
