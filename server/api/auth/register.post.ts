type Body = {
  name: string;
  email: string;
  dept: string;
  section: string;
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

export default defineEventHandler(async (event) => {
  const body = await readBody<Body>(event);

  try {
    const registerUser = await $fetch<UserDetails>(
      "http://localhost:8998/api/v1/admin/create-user?a_email=aritra@gdgoctiu.com&a_pass=RJiQ$jwzeOQrR$z9",
      {
        method: "POST",
        body: {
          name: body.name,
          email: body.email,
          dept: body.dept,
          section: body.section,
        },
      }
    );

    const login = await $fetch<Loginuser>(
      "http://localhost:8998/api/v1/users/login",
      {
        method: "POST",
        body: {
          email: registerUser.user.email,
          password: registerUser.user.password,
        },
      }
    );

    console.log(login);

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
