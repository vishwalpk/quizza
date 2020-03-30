import { DetailedHTMLProps, HTMLAttributes, forwardRef } from "react";
import Grid, { GridProps } from "../Grid/Grid";
import { css, jsx } from "@emotion/core";

import { Theme } from "../../../theme";
import { getMediaQueries } from "../../../utils/style.utils";
import useHeaderHeight from "../../../hooks/useHeaderHeight";
import { useTheme } from "emotion-theming";
import useWindowSize from "../../../hooks/useWindowSize";

// below comment line is required
// it tells babel how to convert properly
/** @jsx jsx */

interface PageWrapperProps extends GridProps {}
const PageWrapper = forwardRef<HTMLDivElement, PageWrapperProps>(
  ({ children, ...otherProps }, ref) => {
    const headerHeight = useHeaderHeight();
    const windowSize = useWindowSize();
    const theme = useTheme<Theme>();
    const isLargeWindow =
      !theme.devices.sizes.lg || windowSize.width >= theme.devices.sizes.lg;

    return (
      <Grid
        css={css`
          min-height: 100%;
          margin-top: -${headerHeight}px;
          padding-top: ${headerHeight}px;

          background-color: ${theme.colors.light};

          ${getMediaQueries().lg} {
            padding-bottom: ${headerHeight / 2}px;
          }
        `}
        ref={ref}
        {...otherProps}
      >
        <Grid
          container={isLargeWindow}
          css={css`
            border-radius: 0;
            box-shadow: 2px 10px 15px rgba(0, 0, 0, 0.25);

            background-color: white;

            ${getMediaQueries().lg} {
              border-radius: 25px;
            }
          `}
        >
          {children}
        </Grid>
      </Grid>
    );
  },
);
export default PageWrapper;
