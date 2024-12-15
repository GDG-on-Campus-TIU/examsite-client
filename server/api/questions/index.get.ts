import { API_URL } from "~/data/api_url";
import { QuestionType } from "~/types";

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
