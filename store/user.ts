import { defineStore } from "pinia";

export const userStore = defineStore("user", {
  state: () => {
    return {
      token: "error",
      name: "error",
      email: "error",
      attempts: 0,
    };
  },

  actions: {
    login(userInfo: {
      token: string;
      name: string;
      email: string;
      attempts: number;
    }) {
      this.token = userInfo.token;
      this.name = userInfo.name;
      this.email = userInfo.email;
      this.attempts = this.attempts;
    },

    logout() {
      useCookie("token").value = "";
      useCookie("name").value = "";
      useCookie("email").value = "";

      this.token = "";
      this.name = "";
      this.email = "";
      this.attempts = 0;
    },

    setUserData(userInfo: {
      token: string;
      name: string;
      email: string;
      attempts: number;
    }) {
      this.token = userInfo.token;
      this.name = userInfo.name;
      this.email = userInfo.email;
      this.attempts = userInfo.attempts;
    },

    async getMe() {
      const token = useCookie("token");
      let me = await $fetch<{ email: string; name: string; attempts: number }>(
        "/api/auth/me",
        {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        }
      );

      this.name = me.name;
      this.email = me.email;
      this.attempts = me.attempts;
      this.token = token.value!;
    },
  },
});
