import * as functions from "firebase-functions";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
import Question from "./Models/Question";

export const getQuestions = functions.https.onRequest(
  async (request, response) => {
    const questions = await Question.get();
    response.json(
      questions.map(({ options, ...rest }) => ({
        ...rest,
        options: options.map(({ isAnswer, ...otherOptionFields }) => ({
          ...otherOptionFields,
        })),
      })),
    );
  },
);

export const postAnswers = functions.https.onRequest(
  async (request, response) => {
    if (request.method !== "POST") {
      response.status(400).json({
        message: "Please send a POST request",
      });
      return;
    }

    const { questions: ids } = request.body;

    const questions = await Question.get();
    response.json(
      questions
        .filter(q => q._id in ids)
        .map(q => ({ [q._id]: q.options.find(o => o.isAnswer) })),
    );
  },
);
