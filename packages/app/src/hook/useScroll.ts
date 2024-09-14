import type React from "react";
import { useCallback, useEffect, useState } from "react";

export function useScroll(ref: React.RefObject<HTMLDivElement>) {
  const scrollToBottom = useCallback(() => {
    const container = ref.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [ref]);

  const [isScrolledAway, setIsScrolledAway] = useState(false);

  const detectScrollAway = useCallback(() => {
    const container = ref.current;
    if (container) {
      const { scrollTop, scrollHeight, clientHeight } = container;
      // Check if the user has scrolled to the bottom of the chat
      // scrollHeight: total height of the scrollable content
      // scrollTop: distance from the top of the viewport to the top of the content
      // clientHeight: height of the visible area
      // If the difference is less than 1 pixel, consider it "at the bottom"
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 1;
      setIsScrolledAway(!isAtBottom);
    }
  }, [ref]);

  useEffect(() => {
    const container = ref.current;
    if (container) {
      container.addEventListener("scroll", detectScrollAway);
      return () => container.removeEventListener("scroll", detectScrollAway);
    }
    return () => {};
  }, [detectScrollAway, ref]);

  return { scrollToBottom, isScrolledAway };
}
