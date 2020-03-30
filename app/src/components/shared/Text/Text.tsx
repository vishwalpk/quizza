import { DetailedHTMLProps, HTMLAttributes, memo } from "react";
import { css, jsx } from "@emotion/core";

import { Theme } from "../../../theme";
import { useTheme } from "emotion-theming";

// below comment line is required
// it tells babel how to convert properly
/** @jsx jsx */

const propStyleMapper: any = {
  getSize: (size: number) => {
    return [0.8, 1, 1.25, 1.5, 2, 2.5][size - 1];
  },
};

interface TextProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  size?: 1 | 2 | 3 | 4 | 5 | 6;
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "default" | "dark" | "light";
  align?: "left" | "center" | "right";
  weight?: string | number;
  lineHeight?: number | string;
  letterSpacing?: number | string;
}
export default memo(function Text({
  size = 2,
  weight = "normal",
  variant = "default",
  children = null,
  lineHeight,
  letterSpacing,
  align = "left",
  ...rest
}: TextProps) {
  const theme = useTheme<Theme>();

  // const alignObj = getMediaSupportedProp(align);

  return (
    <span
      css={css`
        font-size: ${propStyleMapper.getSize(size)}rem;
        font-weight: ${weight !== "normal" && weight};
        color: ${variant && theme.colors[variant]};
        line-height: ${lineHeight};
        letter-spacing: ${letterSpacing};
        text-align: ${align !== "left" && align};
      `}
      {...rest}
    >
      {children}
    </span>
  );
});
