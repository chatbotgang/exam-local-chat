import { useCallback, useEffect, useState } from "react";

export default function useExecuteAfterRender(callback: () => void) {
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    if (trigger) {
      callback();
      setTrigger(false);
    }
  }, [callback, trigger]);

  const executeAfterRender = useCallback(() => setTrigger(true), [setTrigger]);

  return executeAfterRender;
}
