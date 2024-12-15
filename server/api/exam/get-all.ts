import { API_URL } from "~/data/api_url";

export default defineEventHandler(async (event) => {
  const header = getHeader(event, "Authorization");

  let exams = await $fetch(`${API_URL}/exam/get-all`, {
    headers: {
      Authorization: header!,
    },
  });

  return exams;
});
