import { MutableRefObject, useCallback, useEffect, useRef } from "react";

type useDebounceHook = <T extends (...args: any[]) => void>(
  fn: T,
  duration: number,
  options?: { trailing?: boolean; leading?: boolean },
) => T;

const useDebounce: useDebounceHook = (
  fn,
  duration,
  options = { trailing: true },
) => {
  const { trailing = true, leading = false } = options;

  type TimerId = NodeJS.Timeout | null;
  const timerIdRef = useRef<TimerId>(null);

  const updateDebounced = useCallback(() => {
    const setTimerId = (value: TimerId) => {
      (timerIdRef as MutableRefObject<typeof value>).current = value;
    };

    return ((...args) => {
      const { current: timerId } = timerIdRef;
      if (timerId === null && leading) fn(...args);

      if (timerId !== null) clearTimeout(timerId);

      const updatedTimerId = setTimeout(() => {
        if (trailing) fn(...args);

        setTimerId(null);
      }, duration);

      setTimerId(updatedTimerId);
    }) as typeof fn;
  }, [fn, leading, duration, trailing]);

  const debounced = useRef(updateDebounced());

  useEffect(() => {
    updateDebounced();

    return () => {
      const { current: timerId } = timerIdRef;
      if (timerId !== null) clearTimeout(timerId);
    };
  }, [fn, duration, trailing, updateDebounced]);

  return debounced.current;
};
export default useDebounce;
