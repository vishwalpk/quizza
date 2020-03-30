export type DeviceTypes = "default" | "md" | "lg";
export interface DeviceSizes {
  default: number | string;
  md?: number | string;
  lg?: number | string;
}
export interface Theme {
  colors: {
    [k: string]: string;
  };
  devices: {
    sizes: DeviceSizes;
  };
}
const theme: Theme = {
  colors: {
    primary: "#02DA99",
    secondary: "#FF6584",
    default: "#727272",
    dark: "#303735",
    light: "#F1F1F1",
  },
  devices: {
    sizes: {
      default: 0,
      md: 601,
      lg: 993,
    },
  },
};
export default theme;
