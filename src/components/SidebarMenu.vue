<template>
  <aside>
    <div>
      <p>Clientes</p>
    </div>

    <router-link
      to="/cadastrar-cliente"
      :class="{
        'page-active': $route.path === '/cadastrar-cliente',
      }"
    >
      <i class="fa-regular fa-square-plus"></i>
      <span>Adicionar cadastro</span>
    </router-link>

    <router-link
      to="/gerenciar-cadastros"
      :class="{
        'page-active': $route.path === '/gerenciar-cadastros',
      }"
    >
      <i class="fa-regular fa-rectangle-list"></i>
      <span>Gerenciar cadastros</span>
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
@import "../assets/styles/globalStyles.scss";

aside {
  position: fixed;
  left: 0;
  width: $width-sidebar-desk;
  height: 100%;
  background-color: $color-black-02;

  div,
  a {
    background-color: $color-black-02;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 5px;
    color: $color-white;
    text-decoration: none;
    border-bottom: 1px solid $color-gray;
    font-size: 15px;
  }

  div {
    height: 50px;
    padding: 5px 30px;
    font-weight: 600;

    span {
      font-size: 16px;
    }
  }

  a {
    height: 30px;

    span {
      margin-left: 5px;
    }

    &:nth-child(1) {
      width: 20px;
    }

    &.page-active {
      font-weight: 500;
      background-color: $color-yellow !important;
      color: $color-black-02 !important;
    }

    &:hover {
      background-color: $color-black-hover;
    }
  }
}
</style>
