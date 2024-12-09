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
          <!-- Name Field -->
          <div>
            <Label for="name">Name</Label>
            <Input
              id="name"
              type="text"
              v-model="form.name"
              placeholder="Enter your name"
            />
          </div>

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
            <Label for="department">Department</Label>
            <Input
              id="department"
              type="text"
              v-model="form.department"
              placeholder="Enter your department"
            />
          </div>

          <!-- Section Field -->
          <div>
            <Label for="section">Section</Label>
            <Input
              id="section"
              type="text"
              v-model="form.section"
              placeholder="Enter your section"
            />
          </div>
        </form>
      </CardContent>

      <CardFooter class="flex justify-end">
        <Button @click="registerUser">Login</Button>
      </CardFooter>
    </Card>
  </div>
</template>

<script setup>
import { userStore } from "~/store/user";
const store = userStore();

// Form data
const form = ref({
  name: "",
  email: "",
  department: "",
  section: "",
});

const registerUser = async () => {
  form.value.name.trim();
  form.value.email.trim();
  form.value.department.trim();
  form.value.section.trim();

  let register = await $fetch("/api/auth/register", {
    method: "POST",

    body: {
      name: form.value.name,
      email: form.value.email,
      dept: form.value.department,
      section: form.value.section,
    },
  });

  const tokenCookie = useCookie("token");
  const nameCookie = useCookie("name");
  const emailCookie = useCookie("email");

  tokenCookie.value = register.token;
  nameCookie.value = register.name;
  emailCookie.value = register.email;

  store.login(register.token, form.value.name, form.value.email);
};
</script>

<style scoped>
/* Custom styles can go here if needed */
</style>
