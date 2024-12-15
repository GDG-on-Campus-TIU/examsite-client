import { API_URL } from "~/data/api_url";

type Body = {
  email: string;
  password: string;
};

type Loginuser = {
  userDetails: AttendeeType;
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
  const body = await readBody<Body>(event);

  try {
    const login = await $fetch<Loginuser>(`${API_URL}/users/login`, {
      method: "POST",
      body: {
        email: body.email,
        password: body.password,
      },
    });

    return {
      token: login.token,
      name: login.userDetails.name,
      email: login.userDetails.email,
      uid: login.userDetails._id,
      attempts: login.userDetails.attempts,
    };
  } catch (error) {
    setResponseStatus(event, 400, "Bad Request");
    return "error";
  }
});
