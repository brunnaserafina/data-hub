<template>
  <aside>
    <div>
      <p>Clientes</p>
      <!-- <span>
        <i class="fa-solid fa-chevron-down"></i>
      </span> -->
    </div>

    <router-link
      to="/cadastrar-cliente"
      @click="updateActive('cadastro')"
      :class="{ 'page-active': active === 'cadastro' }"
    >
      <i class="fa-regular fa-square-plus"></i>
      <span>Adicionar cadastro</span>
    </router-link>

    <router-link
      to="/gerenciar-cadastros"
      @click="updateActive('list')"
      :class="{ 'page-active': active === 'list' }"
    >
      <i class="fa-regular fa-rectangle-list"></i>
      <span>Listar e gerenciar cadastros</span>
    </router-link>
  </aside>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  name: "SidebarMenu",
  setup() {
    const active = ref<string>("");

    function updateActive(item: string) {
      active.value = item;
      localStorage.setItem("activeRoute", item);
    }

    onMounted(() => {
      const savedActiveRoute = localStorage.getItem("activeRoute");
      if (savedActiveRoute) {
        active.value = savedActiveRoute;
      }
    });

    return {
      active,
      updateActive,
    };
  },
});
</script>

<style lang="scss">
aside {
  position: fixed;
  left: 0;
  width: 300px;
  height: 100%;
  background-color: #2c2c2c;

  div {
    background-color: #2c2c2c;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 30px;
    box-sizing: border-box;
    font-weight: 600;
    border-bottom: 1px solid #9c9c9c;
    color: white;

    span {
      font-size: 16px;
    }
  }

  a {
    display: block;
    color: inherit;
    text-decoration: none;
    background-color: #2c2c2c;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 5px;
    border-bottom: 1px solid #9c9c9c;
    height: 30px;
    font-size: 15px;
    color: white;

    :nth-child(1) {
      width: 20px;
    }

    span {
      margin-left: 5px;
    }

    &:hover {
      background-color: #404040;
    }
  }

  .page-active {
    font-weight: 500;
    background-color: #ffb60d !important;
    color: black !important;
  }
}
</style>
