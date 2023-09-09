<template>
  <main>
    <NavbarMenu />

    <SidebarMenu />

    <router-view></router-view>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SidebarMenu from "./components/SidebarMenu.vue";
import NavbarMenu from "./components/NavbarMenu.vue";

export default defineComponent({
  name: "App",
  components: { SidebarMenu, NavbarMenu },
});
</script>

<style lang="scss">
#app {
  font-family: "Poppins", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2e2e2e;
}

body {
  background-color: #f1f1f1;
}
</style>
