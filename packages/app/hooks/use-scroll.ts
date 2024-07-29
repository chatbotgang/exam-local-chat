import { debounce } from "lodash";
import { useEffect, useRef, useState } from "react";

export const useScroll = () => {
  const ref = useRef<HTMLDivElement>(null);
  const current = ref.current;
  // when scroll to bottom this state will be false
  const [isScrolling, setIsScrolling] = useState(false);

  const scrollToBottom = () => {
    // scroll after rendering
    ref.current?.scrollTo({
      top: ref.current?.scrollHeight,
    });
    setIsScrolling(false);
  };

  const handleScroll = debounce((e) => {
    const target = e.target as HTMLDivElement;
    const { scrollTop, scrollHeight, clientHeight } = target;

    // when scroll to bottom
    if (scrollHeight - scrollTop - clientHeight <= 100) {
      setIsScrolling(false);
    } else {
      setIsScrolling(true);
    }
  }, 200);

  useEffect(() => {
    current?.addEventListener("scroll", handleScroll);

    return () => {
      current?.removeEventListener("scroll", handleScroll);
    };
  }, [current, handleScroll]);

  return {
    ref,
    isScrolling,
    scrollToBottom,
  };
};
