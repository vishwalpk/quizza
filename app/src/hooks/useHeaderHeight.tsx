import {
  MutableRefObject,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import useDebounce from "./useDebounce";
import useEventListener from "./useEventListener";

export default function useHeaderHeight() {
  const [height, setHeight] = useState(0);
  const header = useRef<HTMLElement>(null);

  const listener = useCallback(() => {
    if (!header.current) {
      (header as MutableRefObject<
        typeof header.current
      >).current = document.querySelector("header");
    }

    const height = (header.current as HTMLElement)?.offsetHeight;
    setHeight(height);
  }, []);
  const debouncedListener = useDebounce(listener, 1000, {
    trailing: true,
    leading: true,
  });

  useLayoutEffect(() => {
    debouncedListener();
  }, [debouncedListener]);

  useEventListener("resize", debouncedListener);
  useEventListener("load", debouncedListener);

  return height;
}
