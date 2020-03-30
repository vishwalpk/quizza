import Question from "./Question";

export default interface QuestionUI extends Question {
  viewed?: boolean;
  isActive?: boolean;
}
