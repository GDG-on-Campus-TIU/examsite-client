import { API_URL } from "~/data/api_url";

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
    const login = await $fetch<Loginuser>(`${API_URL}/api/v1/users/me`, {
      headers: {
        Authorization: header!,
      },
    });

    return {
      name: login.user.name,
      email: login.user.email,
      uid: login.user._id,
      attempts: login.user.attempts,
    };
  } catch (error) {
    setResponseStatus(event, 400, "Bad Request");
    return "error";
  }
});
