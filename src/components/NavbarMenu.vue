<template>
  <nav>
    <img src="../assets/images/logo-escriba.png" alt="Logo Escriba" />
    <p>Olá, seja bem vindo(a)!</p>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavbarMenu",
});
</script>

<style lang="scss">
@import "../assets/styles/globalStyles.scss";

nav {
  background-color: $color-black-01;
  display: flex;
  justify-content: space-between;
  height: 100px;
  padding: 0 30px;
  box-sizing: border-box;
  align-items: center;

  p {
    color: $color-white;
  }
}
</style>
