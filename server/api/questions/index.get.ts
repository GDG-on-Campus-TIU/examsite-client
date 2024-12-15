import { API_URL } from "~/data/api_url";

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
      `${API_URL}/questions/get-all/675ca1c674e4a281e24faa3f?a_email=aritra@gdgoctiu.com&a_pass=RJiQ$jwzeOQrR$z9`
    );

    return questions;
  } catch (error) {
    return null;
  }
});
