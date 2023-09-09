<template>
  <nav>
    <img src="../assets/logo-escriba.png" alt="Logo Escriba" />
    <p>Olá, seja bem vindo!</p>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavbarMenu",
});
</script>

<style lang="scss">
nav {
  background-color: #1a1a1a;
  display: flex;
  justify-content: space-between;
  height: 100px;
  padding: 0 30px;
  box-sizing: border-box;
  align-items: center;

  p {
    color: white;
  }
}
</style>
