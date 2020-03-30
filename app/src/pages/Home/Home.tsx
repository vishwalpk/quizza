import "./Home.scss";

import { Fragment, memo } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { css, jsx } from "@emotion/core";

import Button from "../../components/shared/Button/Button";
import Grid from "../../components/shared/Grid/Grid";
import Text from "../../components/shared/Text/Text";
import { getMediaQueries } from "../../utils/style.utils";
import illustration from "../../assets/images/Home/hero-graphic.svg";
import useHeaderHeight from "../../hooks/useHeaderHeight";
import wavesBg from "../../assets/images/Home/waves.png";

// below comment line is required
// it tells babel how to convert properly
/** @jsx jsx */

const Contents = memo(() => {
  return (
    <Fragment>
      <img
        alt="Background design"
        src={wavesBg}
        width="100%"
        height="100%"
        css={css`
          position: absolute;
          top: 0;
          left: 0;
          z-index: -1;
        `}
      />
      <Grid container>
        <Grid
          columns={[12, 7, 5]}
          order={[1, 0, 0]}
          direction="column"
          justifyContent="center"
          alignItems="center"
          css={css`
            text-align: center;
            ${getMediaQueries().md} {
              align-items: flex-start;
              text-align: left;
            }
          `}
        >
          <Grid columns="auto">
            <Text
              size={6}
              weight="bold"
              variant="primary"
              lineHeight="1.06em"
              css={css`
                margin-bottom: 0.4em;
                margin-top: 1em;
                ${getMediaQueries().md} {
                  margin-top: 0;
                }
              `}
            >
              TEST YOUR
              <br />
              ABILITY
            </Text>
          </Grid>

          <Grid columns={10}>
            <Text weight="light" size={2}>
              Take our quiz to evaluate your awareness of topics ranging from
              science, politics and many more.
            </Text>
          </Grid>

          <Grid columns="auto">
            <Button
              as={Link}
              css={css`
                margin-top: 2.25em;
              `}
              to="/quiz"
            >
              Start quiz
            </Button>
          </Grid>
        </Grid>

        <Grid columns={[12, 5, 7]}>
          <img
            alt="Quiz taking graphic"
            src={illustration}
            width="60%"
            css={css`
              margin: auto;
              ${getMediaQueries().md} {
                width: 90%;
              }
            `}
          />
        </Grid>
      </Grid>
    </Fragment>
  );
});

interface HomeProps {}
export default memo(function Home(props: RouteComponentProps<HomeProps>) {
  const headerHeight = useHeaderHeight();

  return (
    <Grid
      alignItems="center"
      alignContent="center"
      css={css`
        position: relative;

        min-height: 100%;
        margin-top: -${headerHeight}px;
      `}
    >
      <Contents></Contents>
    </Grid>
  );
});
