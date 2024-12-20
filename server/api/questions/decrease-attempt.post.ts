import { API_URL } from "~/data/api_url";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const token = getHeader(event, "Authorization");

  try {
    const submitExam = await $fetch(`${API_URL}/users/decrease-attempts`, {
      method: "POST",
      headers: {
        Authorization: token!,
      },
    });
  } catch (error) {
    console.log(error);
  }
});
