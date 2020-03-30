import { QuestionsActionTypes, QuestionsActions } from "./types";

import { Option } from "../../../models/Question";
import QuestionUI from "../../../models/QuestionUIState";

export const selectQuestion = (question: QuestionUI): QuestionsActions => ({
  type: QuestionsActionTypes.SELECT_QUESTION,
  payload: { question },
});

export const selectOption = (option: Option): QuestionsActions => ({
  type: QuestionsActionTypes.SELECT_OPTION,
  payload: { option },
});

export const submitQuiz = (): QuestionsActions => ({
  type: QuestionsActionTypes.SUBMIT_QUIZ,
});
