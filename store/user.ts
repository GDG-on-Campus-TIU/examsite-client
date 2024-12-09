import { defineStore } from "pinia";

export const userStore = defineStore("user", {
  state: () => {
    return {
      token: "error",
      name: "error",
      email: "error",
    };
  },

  actions: {
    login(userInfo: { token: string; name: string; email: string }) {
      this.token = userInfo.token;
      this.name = userInfo.name;
      this.email = userInfo.email;
    },
  },
});
