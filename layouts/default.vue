<script setup lang="ts">
const user = userStore();

const route = useRoute();

const links = [
  {
    name: "Home",
    to: "/",
    icon: "heroicons:home",
    iconActive: "heroicons:home-solid",
  },
];

const logout = () => {
  user.logout();
  useRouter().push("/login");
};

// ATTENTION: WHEN IN DEVELOPMENT, COMMENT THIS CODE OUT
// onMounted(() => {
//   document.addEventListener("keydown", (event) => {
//     if (
//       (event.ctrlKey && event.key === "a") ||
//       (event.ctrlKey && event.key === "u") ||
//       event.key === "F12"
//     ) {
//       event.preventDefault();
//     }
//   });

//   // Disable right-click context menu
//   document.addEventListener("contextmenu", (event) => {
//     event.preventDefault();
//   });

//   let mediaDevices = navigator.mediaDevices;
//   mediaDevices.getUserMedia({
//     video: true,
//     audio: true,
//   });
// });
</script>

<template>
  <header class="border">
    <div class="flex justify-between items-center p-4">
      <div class="pl-2 md:pl-7">
        <Sheet>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle class="font-bold md:text-xl text-left flex items-end">
                <img src="../assets/images/logo.PNG" class="w-44" alt="" />
              </SheetTitle>
            </SheetHeader>

            <ul class="space-y-2 mt-10 w-full kanit">
              <nuxt-link
                v-for="link in links"
                active-class="link_active"
                class="space-y-4"
                :to="link.to"
              >
                <Button
                  variant="ghost"
                  class="w-full justify-start text-xl mb-5"
                >
                  <Icon
                    :name="
                      route.fullPath === link.to ? link.iconActive : link.icon
                    "
                    class="w-7 h-7 mr-3"
                  />

                  {{ link.name }}
                  <span
                    class="ml-auto rounded w-2 h-6 bg-primary hidden"
                  ></span>
                </Button>
              </nuxt-link>
            </ul>
          </SheetContent>

          <div class="flex">
            <SheetTrigger as="button" class="flex justify-end items-center">
              <Icon name="heroicons:list-bullet" class="w-9 h-9" />
            </SheetTrigger>
            <nuxt-link to="/">
              <h1
                class="text-2xl font-bold font-montserrat ml-2 flex items-end"
              >
                <img src="../assets/images/logo.PNG" alt="Logo" class="w-44" />
              </h1>
            </nuxt-link>
          </div>
        </Sheet>
      </div>

      <div class="flex items-center justify-center">
        <img src="../assets/images/gdg.png" alt="GDG Logo" class="w-56" />
      </div>

      <div class="pr-2 md:pr-7 flex items-center" v-if="user.token">
        <span class="kanit font-bold mr-2 md:block hidden">
          {{ user?.name }}
        </span>

        <DropdownMenu v-if="user.token">
          <DropdownMenuTrigger as-child>
            <Button variant="ghost" class="h-8 w-8 rounded-full">
              <Avatar class="ml-2">
                <AvatarFallback>
                  {{
                    user.name.charAt(0)! +
                    user?.name
                      .split(" ")
                      [user.name.split(" ").length - 1].charAt(0)!
                  }}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent class="w-56" align="end">
            <DropdownMenuLabel class="font-normal flex">
              <div class="flex flex-col space-y-1">
                <p class="text-sm font-medium leading-none">
                  {{ user?.name }}
                </p>
                <p class="text-xs leading-none text-muted-foreground">
                  {{ user?.email }}
                </p>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem @click="logout()">
              <Icon name="mdi:logout" />

              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </header>

  <main class="p-4 md:p-10">
    <slot />
  </main>
</template>

<style lang="scss">
.link_active {
  button {
    @apply bg-border;
  }

  span {
    @apply block;
  }
}
</style>
