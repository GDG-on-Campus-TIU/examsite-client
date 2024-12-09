<script lang="ts" setup>
import { userStore } from "./store/user";

const tokenCookie = useCookie("token");
const nameCookie = useCookie("name");
const emailCookie = useCookie("email");

const user = userStore();

if (tokenCookie.value) {
  user.token = tokenCookie.value;
  user.name = nameCookie.value ?? "";
  user.email = emailCookie.value ?? "";
}
</script>

<template>
  <nuxt-layout>
    <nuxt-page></nuxt-page>
  </nuxt-layout>
</template>
