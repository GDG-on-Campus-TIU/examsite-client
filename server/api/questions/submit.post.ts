export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const token = getHeader(event, "Authorization");

  console.log(body);
});
