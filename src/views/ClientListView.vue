<template>
  <section id="client-list">
    <div>
      <div class="title-search">
        <h1>Clientes cadastrados</h1>
        <div class="search">
          <input
            type="search"
            v-model="searchClient"
            @input="search"
            placeholder="Procurar por..."
          />
          <span>Pesquisar</span>
        </div>
      </div>

      <table class="table">
        <thead>
          <tr v-if="dataClient">
            <th>ID</th>
            <th>Nome</th>
            <th class="center">Data de nascimento</th>
            <th>CPF</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="client in dataClient" :key="client.id">
            <td>{{ client.id }}</td>
            <td>{{ client.name }}</td>
            <td>{{ client.date }}</td>
            <td>{{ client.cpf }}</td>

            <td>
              <button @click="editRouter">
                <i class="fa-regular fa-pen-to-square"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { getClientData, getSearchClientData } from "../services/api";
import router from "@/router";
import IClient from "@/interfaces/IClient";

export default defineComponent({
  name: "ClientListView",
  components: {},
  setup() {
    const dataClient = ref<IClient[]>([]);
    const searchClient = ref<string>("");

    const fetchData = async () => {
      try {
        const response = await getClientData();
        dataClient.value = response;
      } catch (err) {
        console.error(err);
      }
    };

    const search = async () => {
      try {
        const response = await getSearchClientData(searchClient.value);
        dataClient.value = response;
      } catch (err) {
        console.error(err);
      }
    };

    const editRouter = () => {
      router.push("/editar-cadastro");
    };

    watch(searchClient, () => {
      search();
    });

    onMounted(async () => {
      await fetchData();
    });

    return {
      dataClient,
      searchClient,
      search,
      editRouter,
    };
  },
});
</script>

<style lang="scss">
#client-list {
  margin-left: 300px;
  padding: 3%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > div {
    background-color: white;
    width: 70%;
    min-height: 70vh;
    padding: 40px;
    box-sizing: border-box;
  }

  .title-search {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    position: relative;

    h1 {
      text-transform: uppercase;
      font-size: 22px;
      text-align: start;
      margin: 0;
      margin-bottom: 40px;
    }

    h1:after {
      content: "";
      height: 2px;
      width: 100%;
      display: block;
      position: absolute;
      background-color: #cccccc;
      margin-top: 20px;
    }

    input {
      height: 35px;
      border-radius: 5px 0 0 5px;
      padding: 5px !important;
    }

    .search {
      display: flex;

      span {
        display: flex;
        padding: 5px;
        box-sizing: border-box;
        align-items: center;
        justify-content: center;
        height: 35px;
        background-color: #9c9c9c;
        border-radius: 0 5px 5px 0;
        color: white;
      }

      input:focus {
        outline: none;
        border-color: #ffbb00;
        background: #ffffff;
        box-shadow: 0 0 0 2px #fea;
      }

      input {
        border: 2px solid #ffb60d;
        border-right: none;
      }

      input::placeholder {
        font-size: 14px;
      }
    }
  }

  .table {
    background-color: white;
    align-self: center;
    width: 100%;

    th {
      text-transform: uppercase;
      font-weight: 500;
      text-align: center !important;
      vertical-align: middle;
    }

    tr {
      height: 40px;
      align-items: center;
      padding: 30px !important;
    }

    td {
      vertical-align: middle;
      padding: 25px;
      background-color: #f7f7f7;
    }

    .center:last-child {
      align-self: center !important;
    }

    button {
      background-color: #ffb60d;
      border: none;
      border-radius: 5px;
      width: 30px;
      height: 30px;
      text-transform: uppercase;
      font-weight: 600;
      align-self: flex-start;
      cursor: pointer;
    }

    button:hover {
      background: linear-gradient(#ffb60d, #e59317);
    }
  }
}
</style>
