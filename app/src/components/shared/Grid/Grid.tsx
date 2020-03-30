import {
  DetailedHTMLProps,
  Fragment,
  HTMLAttributes,
  forwardRef,
  memo,
} from "react";
import {
  MediaSupportedProp,
  getMediaQueries,
  getMediaSupportedProp,
} from "../../../utils/style.utils";
import { css, jsx } from "@emotion/core";

import Container from "../Container/Container";

// below comment line is required
// it tells babel how to convert properly
/** @jsx jsx */

const stylePropMapper = {
  getLayoutPropertyCss: (
    propName: string,
    prop: MediaSupportedProp<any>,
    callbackFn: (value: string | number) => string | number,
    defaultValue: string | number,
  ): string => {
    const propObj = getMediaSupportedProp(prop);

    const defaultProvided = propObj.default;

    if (Object.keys(propObj).length === 1 && defaultProvided === defaultValue) {
      return "";
    }

    return `
      ${propName}: ${callbackFn(propObj.default)};
      ${Object.entries(propObj)
        .filter(([key]) => key !== "default")
        .reduce(
          (acc, [key, value]) => `
            ${acc}
            ${getMediaQueries()[key]} {
              ${propName}: ${callbackFn(value)};
            }`,
          "",
        )}
    `;
  },
};

type ColumnValues = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type LayoutSizes = ColumnValues | "auto";
export interface GridProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  container?: boolean;
  columns?: MediaSupportedProp<LayoutSizes>;
  offset?: MediaSupportedProp<LayoutSizes>;
  height?: string | number;

  order?: MediaSupportedProp<ColumnValues>;
  children?: React.ReactNode;
  direction?: "column" | "row" | "row-reverse" | "column-reverse";
  justifyContent?:
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  alignItems?: "center" | "flex-start" | "flex-end" | "stretch";
  alignContent?: "center" | "flex-start" | "flex-end";
}

const Grid = memo(
  forwardRef<HTMLDivElement, GridProps>(
    (
      {
        columns = 12,
        offset = 0,
        height = "auto",
        order = 0,
        container = false,
        children = null,
        direction = "row",
        justifyContent = "flex-start",
        alignItems = "flex-start",
        alignContent = "flex-start",
        ...otherProps
      },
      ref,
    ) => {
      const Wrapper = container ? Container : Fragment;

      // const refProp = { ref };
      const heightStyle = css`
        height: ${typeof height === "number" ? `${height}px` : height};
      `;
      const wrapperProps = container
        ? {
            css: heightStyle,
            // ...refProp
          }
        : {};

      // const childProps = container ? {} : { ...refProp };

      return (
        <Wrapper {...wrapperProps}>
          <div
            css={css`
            display: flex;
            flex-wrap: wrap;
            flex-direction: ${direction !== "row" && direction};
            justify-content: ${justifyContent !== "flex-start" &&
              justifyContent};
            align-items: ${alignItems !== "flex-start" && alignItems};
            align-content: ${alignContent !== "flex-start" && alignContent};
            ${stylePropMapper.getLayoutPropertyCss(
              "order",
              order,
              value => value,
              0,
            )}

            ${heightStyle}
            ${stylePropMapper.getLayoutPropertyCss(
              "width",
              columns,
              value =>
                value !== "auto"
                  ? `
                    ${(+value / 12) * 100}%;
                    display: ${+value === 0 ? "none" : "flex"};`
                  : "auto",
              "auto",
            )}
            ${stylePropMapper.getLayoutPropertyCss(
              "margin-left",
              offset,
              value => (value !== "auto" ? `${(+value / 12) * 100}%` : "auto"),
              0,
            )}
          `}
            ref={ref}
            {...otherProps}
          >
            {children}
          </div>
        </Wrapper>
      );
    },
  ),
);
export default Grid;
