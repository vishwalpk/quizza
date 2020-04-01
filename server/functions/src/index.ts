import * as functions from "firebase-functions";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
import Question from "./Models/Question";

export const getQuestions = functions.https.onRequest(
  async (request, response) => {
    const questions = await Question.get();
    response.json(questions);
  },
);

// export const getAnswers = functions.https.onRequest(
//   async (request, response) => {
//     const { questions } = request.body;
//     response.json(questions)
//   },
// );
