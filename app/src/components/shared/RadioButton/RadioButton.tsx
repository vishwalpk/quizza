import {
  DetailedHTMLProps,
  Fragment,
  HTMLAttributes,
  InputHTMLAttributes,
} from "react";
import { css, jsx } from "@emotion/core";

import Grid from "../Grid/Grid";
import { Theme } from "../../../theme";
import { useTheme } from "emotion-theming";

// below comment line is required
// it tells babel how to convert properly
/** @jsx jsx */
interface RadioButtonProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}
export default function RadioButton({
  className,
  ...otherProps
}: RadioButtonProps) {
  const theme = useTheme<Theme>();

  return (
    <span
      css={css`
        display: inline-block;

        position: relative;
        height: 1.5rem;
        width: 1.5rem;

        cursor: pointer;
      `}
      onClick={e => {
        ((e.currentTarget as HTMLSpanElement)
          .firstChild as HTMLInputElement).checked = true;
      }}
      className={className}
    >
      <input
        type="radio"
        css={css`
          opacity: 0;

          &:checked + span {
            border-color: ${theme.colors.primary};

            &::after {
              content: "";

              height: 60%;
              width: 60%;
              border-radius: 50%;

              background-color: ${theme.colors.primary};

          }
        `}
        {...otherProps}
      ></input>
      <span
        css={css`
          display: inline-flex;
          justify-content: center;
          align-items: center;

          position: absolute;
          top: 0;
          left: 0;

          height: 100%;
          width: 100%;
          border: 0.2rem solid ${theme.colors.primary};
          border-radius: 50%;
        `}
      ></span>
    </span>
  );
}
