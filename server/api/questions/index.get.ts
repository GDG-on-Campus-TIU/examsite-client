import { API_URL } from "~/data/api_url";
import { QuestionType } from "~/types";

export default defineEventHandler(async (event) => {
  try {
    const { questions } = await $fetch<{ questions: QuestionType[] }>(
      `${API_URL}/questions/get-all/6760214d95c0087ef6b8da4b?a_email=aritra@gdgoctiu.com&a_pass=RJiQ$jwzeOQrR$z9`
    );

    return questions;
  } catch (error) {
    return null;
  }
});
