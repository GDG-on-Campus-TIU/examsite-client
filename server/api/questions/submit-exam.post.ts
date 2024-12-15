import { API_URL } from "~/data/api_url";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const token = getHeader(event, "Authorization");

  try {
    await $fetch(`${API_URL}/exam/submit-exam/675ca1c674e4a281e24faa3f`, {
      body: {
        response: body,
      },
      method: "POST",
      headers: {
        Authorization: token!,
      },
    });
    return "ok";
  } catch (error) {
    setResponseStatus(event, 500);
    return "something went wrong";
  }
});
