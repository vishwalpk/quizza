import { ComponentProps, ElementType, forwardRef, memo } from "react";
import { css, jsx } from "@emotion/core";

import Text from "../Text/Text";
import { Theme } from "../../../theme";
import { useTheme } from "emotion-theming";

// below comment line is required
// it tells babel how to convert properly
/** @jsx jsx */

type ButtonProps<T extends ElementType> = ComponentProps<T> & {
  as?: T;
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary" | "default" | "outline";
  shape?: "default" | "ellipse";
  children?: React.ReactNode;
};
const Button = <T extends ElementType<any> = "button">({
  as: ButtonComponent = "button",
  size = "medium",
  variant = "primary",
  children = null,
  shape = "default",
  ...otherProps
}: ButtonProps<T>) => {
  const theme = useTheme<Theme>();

  return (
    <ButtonComponent
      css={css`
        padding: ${shape === "default" ? "0.8" : "1.9"}rem 1.9rem;
        border-radius: 7px;
        border: 5px solid
          ${variant === "outline" ? theme.colors.primary : "transparent"};

        background-color: ${variant === "outline"
          ? "transparent"
          : theme.colors[variant]};
        box-shadow: ${variant === "primary" &&
          "2px 5px 5px rgba(0, 0, 0, 0.25)"};
      `}
      {...otherProps}
    >
      <Text
        size={2}
        css={css`
          text-transform: uppercase;
          color: ${variant !== "outline" ? "white" : theme.colors.primary};
        `}
        weight="bold"
      >
        {children}
      </Text>
    </ButtonComponent>
  );
};
export default Button;
