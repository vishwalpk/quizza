import { DeviceSizes, DeviceTypes, Theme } from "../theme";
import { useLayoutEffect, useState } from "react";

import { useTheme } from "emotion-theming";

type WindowSize = { height: number; width: number; deviceType: string };

type useWindowSizeHook = () => WindowSize;

const useWindowSize: useWindowSizeHook = () => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
    deviceType: "default",
  });

  const theme = useTheme<Theme>();

  const findDeviceType = (width: number): DeviceTypes => {
    if (theme.devices.sizes.md && theme.devices.sizes.md <= width) {
      if (theme.devices.sizes.lg && theme.devices.sizes.lg <= width)
        return "lg";

      return "md";
    }

    return "default";
  };

  useLayoutEffect(() => {
    const onWindowSizeChanged = () => {
      setWindowSize({
        height: window.innerHeight,
        width: window.innerWidth,
        deviceType: findDeviceType(window.innerWidth),
      });
    };

    onWindowSizeChanged();

    window.addEventListener("resize", onWindowSizeChanged);
    return () => window.removeEventListener("resize", onWindowSizeChanged);
  }, []);

  return windowSize;
};
export default useWindowSize;
