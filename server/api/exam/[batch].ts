import { API_URL } from "~/data/api_url";

export default defineEventHandler(async (event) => {
  const batch = getRouterParam(event, "batch");

  const exams = await $fetch(
    `${API_URL}/admin/get-exams/${batch}/?a_email=aritra@gdgoctiu.com&a_pass=RJiQ$jwzeOQrR$z9`
  );

  return exams;
});
