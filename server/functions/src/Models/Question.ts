import Model from "./Model";

const Question = new Model("questions", {
  value: String,
  options: [{ value: String, isAnswer: Boolean }],
});
export default Question;
