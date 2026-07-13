import { useCallback, useEffect, useState } from 'react';

export function useFocusTimer(initialSeconds = 0) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) {
      return;
    }

    const id = setInterval(() => {
      setSeconds((currentSeconds) => currentSeconds + 1);
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, [running]);

  const start = useCallback(() => {
    setRunning(true);
  }, []);

  const pause = useCallback(() => {
    setRunning(false);
  }, []);

  const toggle = useCallback(() => {
    setRunning((currentRunning) => !currentRunning);
  }, []);

  const reset = useCallback(() => {
    setRunning(false);
    setSeconds(initialSeconds);
  }, [initialSeconds]);

  return {
    seconds,
    running,
    start,
    pause,
    toggle,
    reset,
    setSeconds,
  };
}