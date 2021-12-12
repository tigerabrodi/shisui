import { build, fake } from "@jackfranklin/test-data-bot";

type Question = {
  firstQuestion: string;
  secondQuestion: string;
  firstAnswer: string;
  secondAnswer: string;
};

export const buildQuestionAnswers = build<Question>("Question", {
  fields: {
    firstQuestion: fake((f) => f.random.words(3)),
    secondQuestion: fake((f) => f.random.words(3)),
    firstAnswer: fake((f) => f.random.words(5)),
    secondAnswer: fake((f) => f.random.words(5)),
  },
});
