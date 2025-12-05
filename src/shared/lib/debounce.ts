import { useCallback, useRef } from 'react';

export function useDebounce(fn: (...args: any[]) => void, delay = 500) {
  const timeoutRef = useRef<NodeJS.Timeout>(undefined);
  return useCallback(
    (...args: any[]) => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => fn(...args), delay);
    },
    [fn, delay],
  );
}
