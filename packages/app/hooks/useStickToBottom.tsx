import { useCallback, useEffect, useRef, useState } from "react";

const useStickToBottom = () => {
  const [isStickToBottom, setIsStickToBottom] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const isScrollingUp = () => {
      const { scrollTop } = document.documentElement;

      if (scrollTop === lastScrollTop) return false;

      const status = scrollTop < lastScrollTop;
      setLastScrollTop(scrollTop);
      return status;
    };

    const handleScroll = () => {
      if (!isStickToBottom) {
        const { scrollTop, scrollHeight, clientHeight } =
          document.documentElement;

        setIsStickToBottom(scrollTop + clientHeight >= scrollHeight - 1);
        return;
      }

      // prevent script scrolling cause setIsStickToBottom to false
      if (isScrollingUp()) {
        setIsStickToBottom(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isStickToBottom, lastScrollTop]);

  return { bottomRef, scrollToBottom, isStickToBottom };
};

export default useStickToBottom;
