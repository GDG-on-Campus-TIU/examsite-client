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
  },
});
