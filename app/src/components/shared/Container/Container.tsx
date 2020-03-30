import { DetailedHTMLProps, HTMLAttributes, forwardRef, memo } from "react";
import { css, jsx } from "@emotion/core";

// below comment line is required
// it tells babel how to convert properly
/** @jsx jsx */
interface ContainerProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode;
}

const Container = memo(
  forwardRef<HTMLDivElement, ContainerProps>(
    ({ children, ...otherProps }, ref) => {
      return (
        <div
          css={css`
            margin: 0 auto;
            width: 90%;
            max-width: 1150px;
          `}
          ref={ref}
          {...otherProps}
        >
          {children}
        </div>
      );
    },
  ),
);
export default Container;
