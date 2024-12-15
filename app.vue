<script lang="ts" setup>
import Toaster from "@/components/ui/toast/Toaster.vue";

const tokenCookie = useCookie("token");
const nameCookie = useCookie("name");
const emailCookie = useCookie("email");
const attempts = useCookie("attempts");

const user = userStore();
const router = useRouter();

const noCookie = () => {
  definePageMeta({
    layout: "login",
  });
  router.push("/login");
};

if (tokenCookie.value) {
  try {
    let me = await $fetch<{ attempts: number }>("/api/auth/me", {
      headers: {
        Authorization: `Bearer ${tokenCookie.value}`,
      },
    });

    try {
      attempts.value = me.attempts.toString() ?? "";
    } catch (error) {
      //
    }

    user.setUserData({
      token: tokenCookie.value,
      name: nameCookie.value || "",
      email: emailCookie.value || "",
      attempts: parseInt(attempts.value!),
    });
  } catch (error: any) {
    noCookie();
  }
}

if (!tokenCookie.value) {
  noCookie();
}
</script>

<template>
  <Toaster />
  <nuxt-layout>
    <nuxt-page> </nuxt-page>
  </nuxt-layout>
</template>
