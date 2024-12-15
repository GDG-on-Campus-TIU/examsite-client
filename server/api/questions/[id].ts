import { API_URL } from "~/data/api_url";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  try {
    const questions = await $fetch(
      `${API_URL}/questions/get-all/${id}?a_email=aritra@gdgoctiu.com&a_pass=RJiQ$jwzeOQrR$z9`
    );

    return questions;
  } catch (error) {
    return [];
  }
});
