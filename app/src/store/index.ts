import { QuestionsActions } from "./reducers/questions/types";
import { combineReducers } from "redux";
import questionsReducer from "./reducers/questions";

export const rootReducer = combineReducers({ questions: questionsReducer });

export type RootState = ReturnType<typeof rootReducer>;
export type RootActions = QuestionsActions;
