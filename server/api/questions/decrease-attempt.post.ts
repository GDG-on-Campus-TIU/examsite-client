export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const token = getHeader(event, "Authorization");

  try {
    const submitExam = await $fetch(
      "http://localhost:8998/api/v1/users/decrease-attempts",
      {
        method: "POST",
        headers: {
          Authorization: token!,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
});
