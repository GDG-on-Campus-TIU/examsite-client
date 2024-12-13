<template>
  <div
    class="flex items-center justify-center h-screen bg-background text-foreground"
  >
    <Card class="w-full max-w-md space-y-6">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Please fill in your details to proceed.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Email Field -->
          <div>
            <Label for="email">Email</Label>
            <Input
              id="email"
              type="email"
              v-model="form.email"
              placeholder="Enter your email"
            />
          </div>

          <!-- Department Field -->
          <div>
            <Label for="department">Password</Label>
            <Input
              id="department"
              type="password"
              v-model="form.password"
              placeholder="Enter your department"
            />
          </div>
        </form>
      </CardContent>

      <CardFooter class="flex justify-end">
        <Button @click="login">Login</Button>
      </CardFooter>
    </Card>
  </div>
</template>

<script setup>
import { userStore } from "~/store/user";
const store = userStore();

definePageMeta({
  layout: "login",
});

// Form data
const form = ref({
  email: "",
  password: "",
});

const login = async () => {
  form.value.email.trim();
  form.value.password.trim();

  let login = await $fetch("/api/auth/login  ", {
    method: "POST",

    body: {
      email: form.value.email,
      password: form.value.password,
    },
  });

  const tokenCookie = useCookie("token");
  const nameCookie = useCookie("name");
  const emailCookie = useCookie("email");
  const idCookie = useCookie("uid");

  tokenCookie.value = login.token;
  nameCookie.value = login.name;
  emailCookie.value = login.email;
  idCookie.value = login.uid;

  console.log(login);

  store.token = tokenCookie.value;
  store.name = nameCookie.value ?? "";
  store.email = emailCookie.value ?? "";

  store.attempts = login.attempts;

  useRouter().push("/");
};
</script>

<style scoped>
/* Custom styles can go here if needed */
</style>
