import { Action } from "redux";
import { Option } from "../../../models/Question";
import QuestionUI from "../../../models/QuestionUIState";

export type QuestionsState = {
  data: QuestionUI[];
};

export enum QuestionsActionTypes {
  SELECT_QUESTION = "SELECT_QUESTION",
  SELECT_OPTION = "SELECT_OPTION",
  SUBMIT_QUIZ = "SUBMIT_QUIZ",
}

type SelectQuestionAction = {
  readonly type: typeof QuestionsActionTypes.SELECT_QUESTION;
  readonly payload: {
    question: QuestionUI;
  };
};

type SelectOptionAction = {
  readonly type: typeof QuestionsActionTypes.SELECT_OPTION;
  readonly payload: {
    option: Option;
  };
};

type SubmitQuizAction = {
  readonly type: typeof QuestionsActionTypes.SUBMIT_QUIZ;
};

export type QuestionsActions =
  | SelectQuestionAction
  | SelectOptionAction
  | SubmitQuizAction;
