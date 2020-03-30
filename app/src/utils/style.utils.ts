import theme, { DeviceSizes } from "../theme";

export type MediaQueries = {
  [size in keyof DeviceSizes]: string;
};
export const getMediaQueries = (): MediaQueries => {
  return Object.entries(theme.devices.sizes).reduce(
    (acc, [type, size], i) => ({
      ...acc,
      [type]: `@media (min-width: ${size}px)`,
    }),
    {} as MediaQueries,
  );
};
export interface MediaSupportedPropObj extends DeviceSizes {}
export type MediaSupportedProp<T> = T | Array<T> | MediaSupportedPropObj;
export const getMediaSupportedProp = <T>(
  prop: MediaSupportedProp<T>,
): MediaSupportedPropObj => {
  switch (typeof prop) {
    case "string":
    case "number":
      return { default: prop } as MediaSupportedPropObj;

    case "object":
      if (Array.isArray(prop)) {
        return ["default", "md", "lg"]
          .slice(0, prop.length)
          .reduce(
            (acc, key, i) => ({ ...acc, [key]: prop[i] }),
            {} as MediaSupportedPropObj,
          );
      } else {
        return prop as MediaSupportedPropObj;
      }

    default:
      return {} as MediaSupportedPropObj;
  }
};
