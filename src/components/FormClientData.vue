<template>
  <section class="client-registration">
    <div>
      <h1>{{ title }}</h1>

      <form @submit.prevent="handleSubmit" class="form">
        <div class="column1-2">
          <label for="name">Nome completo*</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Insira o nome completo do cliente"
            v-model="formData.nome"
            required
            autofocus
            ref="nameInput"
          />
        </div>
        <div class="column-1">
          <label for="date">Data de nascimento</label>
          <input
            type="date"
            id="date"
            name="date"
            v-model="formData.dataNascimento"
          />
        </div>
        <div>
          <label for="cpf">CPF*</label>
          <input
            type="text"
            id="cpf"
            name="cpf"
            placeholder="Ex.: 000.000.000-00"
            v-maska
            data-maska="###.###.###-##"
            v-model="formData.cpf"
            required
          />
        </div>
        <div class="buttons column-1">
          <button type="submit">Salvar</button>

          <button
            class="delete-button"
            type="reset"
            v-if="title === 'Editar Cadastro'"
            @click="deleteClient"
          >
            Excluir
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, ref } from "vue";
import { vMaska } from "maska";
import { cpf } from "cpf-cnpj-validator";
import { deleteClientData, postClientData, editClientData } from "../services";
import router from "@/router";
import { useStore } from "vuex";

export default defineComponent({
  name: "FormClientData",
  components: {},
  props: {
    title: {
      type: String,
      required: true,
    },
    clientId: {
      type: Number,
      default: null,
    },
  },

  setup(props) {
    const nameInput = ref<HTMLInputElement | null>(null);
    const formData = ref({
      nome: "",
      dataNascimento: "",
      cpf: "",
    });
    const store = useStore();

    const fetchSelectedClientFromVuex = () => {
      const clientData = store.getters.getClientData;

      if (clientData && props.title === "Editar Cadastro") {
        formData.value.nome = clientData.nome;
        formData.value.dataNascimento = clientData.dataNascimento;
        formData.value.cpf = clientData.cpf;
      }
    };

    onMounted(() => {
      fetchSelectedClientFromVuex();

      nextTick(() => {
        if (nameInput.value) {
          nameInput.value.focus(); //autofocus on input even after rendering element
        }
      });
    });

    const handleSubmit = async (event: Event) => {
      event.preventDefault();

      const nameIsCompleted = formData.value.nome.length > 0;
      const nameIsValid =
        formData.value.nome ===
        formData.value.nome.replace(/[^a-zA-ZÀ-ÖØ-öø-ÿ\s]/g, "");

      if (!nameIsCompleted || !nameIsValid) {
        alert(
          "O campo nome é obrigatório e não permite números, insira o nome completo da pessoa a ser cadastrada e tente novamente."
        );
        return;
      }

      const cpfIsValid = cpf.isValid(formData.value.cpf);
      if (cpfIsValid) {
        try {
          if (props.clientId) {
            await editClientData(props.clientId, formData.value);
            router.push("/gerenciar-cadastros");
            alert("Pessoa atualizada com sucesso!");
            return;
          } else {
            await postClientData(formData.value);
            alert("Pessoa cadastrada com sucesso!");
            formData.value.cpf = "";
            formData.value.dataNascimento = "";
            formData.value.nome = "";
          }
        } catch (err) {
          alert(
            "Houve algum erro durante o cadastro de usuário, tente novamente."
          );
        }
      } else {
        alert("O cpf digitado é inválido, corrija e tente novamente.");
      }
    };

    const deleteClient = async () => {
      try {
        if (
          window.confirm("Tem certeza que deseja deletar a pessoa cadastrada?")
        ) {
          await deleteClientData(props.clientId);
          router.push("/gerenciar-cadastros");
          alert("Cliente deletado com sucesso!");
          return;
        }
      } catch (err) {
        console.error(err);
      }
    };

    return {
      formData,
      handleSubmit,
      deleteClient,
      nameInput,
    };
  },
  directives: { maska: vMaska },
});
</script>

<style lang="scss">
@import "../assets/styles/globalStyles.scss";

.client-registration {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: $width-sidebar-desk;
  height: 70vh;

  > div {
    background-color: $color-white;
    padding: 30px;
    justify-content: flex-start;

    h1 {
      text-transform: uppercase;
      font-size: 22px;
      text-align: start;
      margin-bottom: 50px;
      position: relative;

      &:after {
        content: "";
        height: 2px;
        width: 100%;
        display: block;
        position: absolute;
        background-color: $color-gray-01;
        margin-top: 5px;
      }
    }

    form {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;

      .column1-2,
      .column-1 {
        grid-column: 1;

        &.column1-2 {
          grid-column: 1/-1;
        }
      }

      label {
        display: block;
        text-align: start;
        margin-bottom: 10px;
      }

      input {
        margin-bottom: 20px;
        width: 100%;
        background-color: $color-gray-02;
        border: 1px solid $color-gray-03;
        height: 50px;
        border-radius: 10px;
        padding: 5px;
        box-sizing: border-box;

        &:focus {
          outline: none;
          border-color: $color-yellow;
          background: $color-white;
          box-shadow: 0 0 0 2px $color-yellow-01;
        }
      }
    }

    .buttons {
      display: flex;
      justify-content: flex-start;
      gap: 30px;

      button {
        background-color: $color-yellow;
        border: none;
        width: 120px;
        height: 60px;
        border-radius: 10px;
        text-transform: uppercase;
        font-weight: 600;
        align-self: flex-start;
        cursor: pointer;

        &:hover {
          background: linear-gradient($color-yellow, $color-yellow-02);
        }

        &.delete-button {
          background-color: $color-red;

          &:hover {
            background: linear-gradient($color-red, $color-red-02);
          }
        }
      }
    }
  }
}
</style>
