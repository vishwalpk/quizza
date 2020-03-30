import Question, { Option, Options } from "../../models/Question";
import { Reducer, memo, useCallback, useReducer, useState } from "react";
import { RootActions, RootState } from "../../store";
import { css, jsx } from "@emotion/core";
import {
  selectOption,
  selectQuestion,
} from "../../store/reducers/questions/actions";
import { useDispatch, useSelector } from "react-redux";

import Button from "../../components/shared/Button/Button";
import Grid from "../../components/shared/Grid/Grid";
import { Link } from "react-router-dom";
import PageWrapper from "../../components/shared/PageWrapper/PageWrapper";
import QuestionUI from "../../models/QuestionUIState";
import RadioButton from "../../components/shared/RadioButton/RadioButton";
import React from "react";
import Text from "../../components/shared/Text/Text";
import { Theme } from "../../theme";
import { getMediaQueries } from "../../utils/style.utils";
import initialQuestions from "../../data/quiz.json";
import questionsReducer from "../../store/reducers/questions";
import useHeaderHeight from "../../hooks/useHeaderHeight";
import { useTheme } from "emotion-theming";
import useWindowSize from "../../hooks/useWindowSize";

// below comment line is required
// it tells babel how to convert properly
/** @jsx jsx */

interface QuizProps {}
export default memo(function Quiz({ ...otherProps }: QuizProps) {
  // const [{ questions }, dispatch] = useReducer(questionsReducer, {
  //   questions: initialQuestions,
  // });
  const questions = useSelector<RootState, QuestionUI[]>(
    state => state.questions.data,
  );
  const dispatch = useDispatch();

  const theme = useTheme<Theme>();

  const activeQuestionIndex = questions.findIndex(cur => cur.isActive);
  const activeQuestion = questions[activeQuestionIndex];

  const isLastQuestionActive = activeQuestionIndex === questions.length - 1;
  const buttonProps = isLastQuestionActive ? { to: "/result" } : {};

  return (
    <PageWrapper>
      <Grid columns={[2, 1, 1]}>
        {questions.map(({ value, options, viewed }, i) => (
          <Grid key={value}>
            <Button
              variant={value === activeQuestion.value ? "primary" : "outline"}
              css={css`
                display: flex;
                justify-content: center;
                align-items: center;

                position: relative;

                width: 100%;
                padding: 1.5em;
                border-radius: 0;
                border: 2px solid
                  ${value !== activeQuestion.value
                    ? theme.colors.light
                    : "transparent"};
                box-shadow: none;

                ${getMediaQueries().lg} {
                  border-top-left-radius: ${i === 0 && "25px"};
                  border-bottom-left-radius: ${i === 7 && "25px"};
                }
              `}
              onClick={e => dispatch(selectQuestion({ value, options }))}
            >
              <Text
                weight="200"
                size={3}
                variant={activeQuestion.value === value ? "light" : "default"}
                css={css`
                  position: relative;

                  &::after {
                    content: ${activeQuestionIndex !== i && viewed && ""};
                  }
                `}
              >
                {i + 1}
              </Text>
              {viewed && i !== activeQuestionIndex && (
                <Text
                  size={2}
                  variant={
                    !!options.find(({ selected }) => selected)
                      ? "primary"
                      : "secondary"
                  }
                  css={css`
                    position: absolute;
                    top: 50%;
                    left: 50%;

                    transform: translate(20%, -125%);
                  `}
                >
                  <i
                    css={css`
                      font-size: inherit;
                    `}
                    className="material-icons"
                  >
                    {!!options.find(({ selected }) => selected)
                      ? "check_circle"
                      : "error"}
                  </i>
                </Text>
              )}
            </Button>
          </Grid>
        ))}
      </Grid>

      <Grid
        columns={[10, 11, 11]}
        css={css`
          padding: 1.25em;

          ${getMediaQueries().lg} {
            padding: 3.5em;
          }
        `}
        direction="column"
      >
        <Text
          size={5}
          weight="regular"
          variant="dark"
          css={css`
            margin-bottom: 0.5em;
          `}
          lineHeight="1.2em"
        >
          {activeQuestion.value}
        </Text>

        <Grid
          direction="column"
          css={css`
            flex-grow: 1;
          `}
        >
          {activeQuestion.options.map(({ value, selected, ...rest }, i) => (
            <Grid
              key={value}
              alignItems="center"
              onClick={e => dispatch(selectOption({ value, ...rest }))}
            >
              <RadioButton
                checked={!!selected}
                css={css`
                  margin-right: 0.75rem;
                `}
                onChange={e => dispatch(selectOption({ value, ...rest }))}
              ></RadioButton>
              <label>
                <Text size={4} variant="dark" lineHeight="2em">
                  {value}
                </Text>
              </label>
            </Grid>
          ))}

          <Grid
            css={css`
              flex-grow: 1;
            `}
            justifyContent="flex-end"
            alignContent="flex-end"
          >
            <Button
              as={isLastQuestionActive ? Link : "button"}
              onClick={e =>
                dispatch(
                  selectQuestion(
                    questions[(activeQuestionIndex + 1) % questions.length],
                  ),
                )
              }
              {...buttonProps}
            >
              <Text
                letterSpacing="0.075em"
                size={2}
                css={css`
                  color: white;
                `}
              >
                {isLastQuestionActive ? "Submit" : "Next"}
              </Text>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </PageWrapper>
  );
});
