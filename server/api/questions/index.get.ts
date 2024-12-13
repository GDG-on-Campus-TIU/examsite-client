export type QuestionType = {
  question: string;
  choices: Array<{ index: number; choice: string }>;
  rightChoice: { index: number; choice: string };
  examId: string;
  _id: string;
};

export default defineEventHandler(async (event) => {
  try {
    const { questions } = await $fetch<{ questions: QuestionType[] }>(
      "http://localhost:8998/api/v1/questions/get-all/6755cc46cf6a991bf8204af9?a_email=aritra@gdgoctiu.com&a_pass=RJiQ$jwzeOQrR$z9"
    );

    return questions;
  } catch (error) {
    return null;
  }
});
