import { Option, Options } from "../../../models/Question";
import {
  QuestionsActionTypes,
  QuestionsActions,
  QuestionsState,
} from "./types";

import QuestionUI from "../../../models/QuestionUIState";
import { Reducer } from "redux";
import questionsData from "../../../data/quiz.json";

let initialQuestions = questionsData.map<QuestionUI>(
  ({ question, options }, i) => ({
    value: question,
    options: options.map(value => ({ value })) as Options,
    isActive: i === 0,
  }),
);
const initialState = { data: initialQuestions };

const questionsReducer: Reducer<QuestionsState, QuestionsActions> = (
  state = initialState,
  { type, payload },
) => {
  switch (type) {
    case QuestionsActionTypes.SELECT_QUESTION: {
      const { question } = payload!;

      const questionIndex = state.data.findIndex(
        q => q.value === question.value,
      );
      return {
        ...state,

        data: state.data.map((q, i) => ({
          ...q,
          viewed: q.viewed || i <= questionIndex,
          isActive: i === questionIndex,
        })),
      };
    }

    case QuestionsActionTypes.SELECT_OPTION: {
      const { value: selectedOption } = payload.option;

      return {
        ...state,
        data: state.data.map(cur =>
          !cur.isActive
            ? cur
            : {
                ...cur,
                options: cur.options.map(({ value, ...rest }) => ({
                  ...rest,
                  value,
                  selected: value === selectedOption,
                })),
              },
        ),
      };
    }

    case QuestionsActionTypes.SUBMIT_QUIZ:
      return {
        ...state,
        data: initialQuestions,
      };

    default:
      return state;
  }
};

export default questionsReducer;
