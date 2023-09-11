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
            ref="searchInput"
          />
          <span>Pesquisar</span>
        </div>
      </div>

      <table class="table">
        <thead>
          <tr>
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
            <td>{{ client.nome }}</td>
            <td>{{ client.dataNascimento }}</td>
            <td>{{ client.cpf }}</td>

            <td>
              <button aria-label="Editar" @click="editRouter(client)">
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
import { defineComponent, nextTick, onMounted, ref, watch } from "vue";
import { getClientData, getSearchClientData } from "../services";
import router from "@/router";
import IClient from "@/interfaces/IClient";
import { useStore } from "vuex";

export default defineComponent({
  name: "ClientListView",
  components: {},
  setup() {
    const dataClient = ref<IClient[]>([]);
    const searchClient = ref<string>("");
    const searchInput = ref<HTMLInputElement | null>(null);
    const store = useStore();

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

    const editRouter = (client: IClient) => {
      store.dispatch("saveClientData", {
        id: client.id,
        nome: client.nome,
        dataNascimento: client.dataNascimento,
        cpf: client.cpf,
      });

      router.push(`/editar-cadastro/${client.id}`);
    };

    watch(searchClient, () => {
      search();
    });

    onMounted(async () => {
      await fetchData();

      nextTick(() => {
        if (searchInput.value) {
          searchInput.value.focus();
        }
      });
    });

    return {
      dataClient,
      searchClient,
      searchInput,
      search,
      editRouter,
    };
  },
});
</script>

<style lang="scss">
@import "../assets/styles/globalStyles.scss";

#client-list {
  margin-left: $width-sidebar-desk;
  padding: 3%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

  > div {
    background-color: $color-white;
    width: 70%;
    min-width: max-content;
    min-height: 70vh;
    padding: 40px;
    box-sizing: border-box;

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

        &:after {
          content: "";
          height: 2px;
          width: 100%;
          display: block;
          position: absolute;
          background-color: $color-gray-01;
          margin-top: 20px;
        }
      }

      .search {
        display: flex;
        justify-content: flex-end;

        span {
          display: flex;
          padding: 5px;
          box-sizing: border-box;
          align-items: center;
          justify-content: center;
          height: 35px;
          background-color: $color-black-hover;
          border-radius: 0 5px 5px 0;
          color: $color-white;
        }

        input {
          height: 35px;
          border-radius: 5px 0 0 5px;
          padding: 5px !important;
          border: 2px solid $color-yellow;
          border-right: none;
          width: 50%;

          &::placeholder {
            font-size: 14px;
          }
        }

        input:focus {
          outline: none;
          border-color: $color-yellow;
          background: $color-white;
          box-shadow: 0 0 0 2px $color-yellow-01;
        }
      }
    }

    .table {
      background-color: $color-white;
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
        background-color: $color-gray-02;

        &.center:last-child {
          align-self: center !important;
        }

        button {
          background-color: $color-yellow;
          border: none;
          border-radius: 5px;
          width: 50px;
          height: 50px;
          text-transform: uppercase;
          font-weight: 600;
          align-self: flex-start;
          cursor: pointer;

          &:hover {
            background: linear-gradient($color-yellow, $color-yellow-02);
          }
        }
      }
    }
  }

  @media (max-width: 1000px) {
    width: 100%;
    margin-left: 0;
    padding: 0;
    box-sizing: border-box !important;

    > div {
      width: 100%;
      padding: 10px !important;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 30px;

      .table {
        font-size: 12px;
        width: 90%;
      }

      .table td {
        padding: 0 !important;
        box-sizing: border-box !important;
      }

      button {
        width: 30px !important;
        height: 30px !important;
      }
    }

    .title-search {
      font-size: 14px;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 90%;

      .search {
        margin-bottom: 20px;
        width: 100% !important;
      }

      input {
        width: 100%;
      }
    }
  }

  @media (max-width: 600px) {
    .search {
      input {
        width: 100% !important;
      }
    }
  }
}
</style>
