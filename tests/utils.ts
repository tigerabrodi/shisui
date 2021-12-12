import { build, fake } from "@jackfranklin/test-data-bot";

type QuestionAnswers = {
  firstQuestion: string;
  secondQuestion: string;
  firstAnswer: string;
  secondAnswer: string;
};

export const buildQuestionAnswer = build<QuestionAnswers>("QuestionAnswers", {
  fields: {
    firstQuestion: fake((f) => f.random.words(4)),
    secondQuestion: fake((f) => f.random.words(4)),
    firstAnswer: fake((f) => f.random.words(3)),
    secondAnswer: fake((f) => f.random.words(3)),
  },
});
