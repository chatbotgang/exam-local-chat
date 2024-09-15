import type React from "react";
import { useCallback, useEffect, useState } from "react";

export function useScroll(ref: React.RefObject<HTMLDivElement>) {
  const scrollToBottom = useCallback(() => {
    const container = ref.current;
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [ref]);

  const [isScrolledAway, setIsScrolledAway] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);

  const detectScrollAway = useCallback(() => {
    const container = ref.current;
    if (container) {
      const { scrollTop: newScrollTop, scrollHeight, clientHeight } = container;
      // Check if the user has scrolled to the bottom of the chat
      // scrollHeight: total height of the scrollable content
      // scrollTop: distance from the top of the viewport to the top of the content
      // clientHeight: height of the visible area
      // If the difference is less than 1 pixel, consider it "at the bottom"
      const isAtBottom = scrollHeight - newScrollTop - clientHeight < 60; // 60 is a message height
      setIsScrolledAway(!isAtBottom);

      setScrollTop(newScrollTop);
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

  return { scrollToBottom, scrollTop, isScrolledAway };
}
