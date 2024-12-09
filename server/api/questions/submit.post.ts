export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const token = getHeader(event, "Authorization");

  console.log({ response: body });

  try {
    const submitExam = await $fetch(
      "http://localhost:8998/api/v1/exam/submit-exam/6755cc46cf6a991bf8204af9",
      {
        method: "POST",
        body: {
          response: body,
        },
        headers: {
          Authorization: token!,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
});
