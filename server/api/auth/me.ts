type Loginuser = {
  user: AttendeeType;
  token: string;
};

type AttendeeType = {
  name: string;
  email: string;
  password: string;
  attempts: number;
  dept: string;
  section: string;
  _id: string;
};

export default defineEventHandler(async (event) => {
  const header = getHeader(event, "Authorization");

  try {
    const login = await $fetch<Loginuser>(
      "http://localhost:8998/api/v1/users/me",
      {
        headers: {
          Authorization: header!,
        },
      }
    );

    return {
      token: login.token,
      name: login.user.name,
      email: login.user.email,
      uid: login.user._id,
      attempts: login.user.attempts,
    };
  } catch (error) {
    console.log(error);

    setResponseStatus(event, 400, "Bad Request");
    return "error";
  }
});
