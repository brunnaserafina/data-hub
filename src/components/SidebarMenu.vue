<template>
  <aside class="home">
    <div>
      <p>Clientes</p>
      <span>
        <i class="fa-solid fa-chevron-down"></i>
      </span>
    </div>

    <router-link to="/">
      <i class="fa-regular fa-square-plus"></i>
      <span>Adicionar cadastro</span>
    </router-link>

    <router-link to="/">
      <i class="fa-regular fa-rectangle-list"></i>
      <span>Listar e gerenciar cadastros</span>
    </router-link>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SidebarMenu",
});
</script>

<style lang="scss">
aside {
  position: fixed;
  left: 0;
  width: 300px;
  height: 100%;
  background-color: #1a1a1a;

  div {
    background-color: #cccccc;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 25px;
    box-sizing: border-box;
    font-weight: 600;
    border-bottom: 1px solid #9c9c9c;
    cursor: pointer;

    span {
      font-size: 16px;
    }
  }

  a {
    display: block;
    color: inherit;
    text-decoration: none;
    background-color: white;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 5px;
    border-bottom: 1px solid #9c9c9c;
    height: 30px;
    font-size: 15px;

    :nth-child(1) {
      width: 20px;
    }

    span {
      margin-left: 5px;
    }

    &:hover {
      background-color: #ededed;
    }
  }
}
</style>
