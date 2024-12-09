type Body = {
  email: string;
  password: string;
};

type UserDetails = {
  user: {
    email: string;
    name: string;
    password: string;
  };
};

type Loginuser = {
  userDetails: {
    _id: string;
    name: string;
    email: string;
  };
  token: string;
};

export type AttendeeType = {
  name: string;
  email: string;
  password: string;
  attempts: number;
  dept: string;
  section: string;
};

export default defineEventHandler(async (event) => {
  const body = await readBody<Body>(event);

  console.log(body);

  try {
    const login = await $fetch<Loginuser>(
      "http://localhost:8998/api/v1/users/login",
      {
        method: "POST",
        body: {
          email: body.email,
          password: body.password,
        },
      }
    );

    return {
      token: login.token,
      name: login.userDetails.name,
      email: login.userDetails.email,
      uid: login.userDetails._id,
    };
  } catch (error) {
    setResponseStatus(event, 400, "Bad Request");
    return "error";
  }
});
