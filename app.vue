<script lang="ts" setup>
import { userStore } from "./store/user";

const tokenCookie = useCookie("token");
const nameCookie = useCookie("name");
const emailCookie = useCookie("email");
const idCookie = useCookie("uid");

const user = userStore();

const noCookie = () => {
  definePageMeta({
    layout: "login",
  });
  useRouter().push("/login");
};

if (tokenCookie.value) {
  try {
    const me = await $fetch<{ attempts: number }>("/api/auth/me", {
      headers: {
        Authorization: `Bearer ${tokenCookie.value}`,
      },
    });

    user.token = tokenCookie.value;
    user.name = nameCookie.value ?? "";
    user.email = emailCookie.value ?? "";
    user.attempts = me.attempts;
  } catch (error) {
    noCookie();
  }
}

if (!tokenCookie.value) {
  noCookie();
}
</script>

<template>
  <nuxt-layout>
    <nuxt-page></nuxt-page>
  </nuxt-layout>
</template>
