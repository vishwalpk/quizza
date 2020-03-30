import Chart, { ChartResults } from "./Chart";
import { css, jsx } from "@emotion/core";

import Grid from "../../components/shared/Grid/Grid";
import PageWrapper from "../../components/shared/PageWrapper/PageWrapper";
import React from "react";
import Text from "../../components/shared/Text/Text";
import useWindowSize from "../../hooks/useWindowSize";

// below comment line is required
// it tells babel how to convert properly
/** @jsx jsx */

interface ResultProps {}
export default function Result({ ...otherProps }: ResultProps) {
  const { width: windowWidth, deviceType } = useWindowSize();

  const getResultData = (
    data: { correct: number; incorrect: number; unanswered: number },
    hide?: { correct?: boolean; incorrect?: boolean; unanswered?: boolean },
  ): ChartResults =>
    Object.entries(data).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: {
          value,
          hideColor: !!hide?.[key],
        },
      }),
      {} as ChartResults,
    );

  const results = {
    correct: 5,
    incorrect: 1,
    unanswered: 2,
  };

  return (
    <PageWrapper>
      <Grid
        css={css`
          padding: ${deviceType === "default" ? "2em 1.25em" : "2.5em"};
        `}
        justifyContent="center"
        alignItems="center"
      >
        <Grid justifyContent="center">
          <Text variant="dark" size={deviceType === "default" ? 5 : 6}>
            YOUR RESULTS
          </Text>
        </Grid>

        <Grid
          css={css`
            align-self: flex-start;
          `}
          justifyContent="space-around"
          alignItems="center"
        >
          <Grid
            columns={[12, 7, 5]}
            justifyContent="center"
            css={css`
              position: relative;
            `}
          >
            <Chart
              results={getResultData(results)}
              size={Math.min(400, windowWidth * 0.6)}
              label
            />

            <Text
              variant="primary"
              size={6}
              css={css`
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
              `}
              weight="bold"
            >
              {Math.round(
                (results.correct /
                  (results.correct + results.incorrect + results.unanswered)) *
                  100,
              )}
              %
            </Text>
          </Grid>

          <Grid columns={[12, 5, 5]}>
            <LegendRow
              results={getResultData(results)}
              type="total"
            ></LegendRow>

            <LegendRow
              results={getResultData(results, { unanswered: true })}
              type="answered"
            ></LegendRow>

            <LegendRow
              results={getResultData(results, {
                correct: true,
                incorrect: true,
              })}
              type="unanswered"
            ></LegendRow>

            <LegendRow
              results={getResultData(results, {
                incorrect: true,
                unanswered: true,
              })}
              type="correct"
            ></LegendRow>

            <LegendRow
              results={getResultData(results, {
                correct: true,
                unanswered: true,
              })}
              type="incorrect"
            ></LegendRow>
          </Grid>
        </Grid>
      </Grid>
    </PageWrapper>
  );
}

interface LegendRowProps {
  results: ChartResults;
  type: "total" | "answered" | "unanswered" | "correct" | "incorrect";
}
function LegendRow({ results, type }: LegendRowProps) {
  const mapTypeToFields = () => {
    switch (type) {
      case "total":
        return {
          title: "Total questions",
          value:
            results.correct.value +
            results.incorrect.value +
            results.unanswered.value,
        };

      case "answered":
        return {
          title: "Answered questions",
          value: results.correct.value + results.incorrect.value,
        };

      case "unanswered":
        return {
          title: "Unanswered questions",
          value: results.unanswered.value,
        };

      default:
        return {
          title: type[0].toUpperCase() + type.substr(1) + " answers",
          value: results[type].value,
        };
    }
  };

  const { title, value } = mapTypeToFields();
  const { deviceType } = useWindowSize();
  const height = deviceType === "default" ? 35 : 45;

  return (
    <Grid
      css={css`
        padding-bottom: 0.5em;
        flex-wrap: nowrap;
      `}
      alignItems="center"
    >
      <Grid
        columns="auto"
        css={css`
          flex-grow: 1;
          flex-wrap: nowrap;
          padding-right: 5px;
        `}
      >
        <Chart results={results} size={height} />
        <Text size={4} variant="dark" lineHeight={`${height}px`}>
          {title}
        </Text>
      </Grid>
      <Text size={4} variant="dark" align="right" lineHeight={`${height}px`}>
        {value}
      </Text>
    </Grid>
  );
}
