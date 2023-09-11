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
            :class="{ 'invalid-name': errorInputName }"
          />
          <small v-if="errorInputName"
            >Preencha o nome de forma correta, com pelo menos um caractere e sem
            números</small
          >
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
            :class="{ 'invalid-name': errorInputCpf }"
            required
          />
          <small v-if="errorInputCpf">Preencha com um CPF válido</small>
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
import Swal from "sweetalert2";

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
    const errorInputName = ref<boolean>(false);
    const errorInputCpf = ref<boolean>(false);

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

    const isNameValid = () => {
      const nameIsCompleted = formData.value.nome.length > 0;
      const nameIsValid =
        formData.value.nome ===
        formData.value.nome.replace(/[^a-zA-ZÀ-ÖØ-öø-ÿ\s]/g, "");

      if (!nameIsCompleted || !nameIsValid) {
        return false;
      }

      return true;
    };

    const handleSubmit = async (event: Event) => {
      event.preventDefault();

      const cpfIsValid = cpf.isValid(formData.value.cpf);

      if (!isNameValid() || !cpfIsValid) {
        if (!isNameValid()) {
          errorInputName.value = true;
        } else {
          errorInputName.value = false;
        }

        if (!cpfIsValid) {
          errorInputCpf.value = true;
        } else {
          errorInputCpf.value = false;
        }

        return;
      }

      errorInputName.value = false;
      errorInputCpf.value = false;
      try {
        if (props.clientId) {
          await editClientData(props.clientId, formData.value);
          router.push("/gerenciar-cadastros");
          Swal.fire({
            position: "bottom-end",
            icon: "success",
            title: "Pessoa atualizada com sucesso!",
            showConfirmButton: false,
            timer: 1200,
          });
          return;
        } else {
          await postClientData(formData.value);
          Swal.fire({
            position: "bottom-end",
            icon: "success",
            title: "Pessoa cadastrada com sucesso!",
            showConfirmButton: false,
            timer: 1200,
          });
          formData.value.cpf = "";
          formData.value.dataNascimento = "";
          formData.value.nome = "";
        }
      } catch (err) {
        Swal.fire({
          position: "bottom-end",
          icon: "error",
          title: "Houve algum erro ao cadastrar o usuário, tente novamente!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    };

    const deleteClient = async () => {
      Swal.fire({
        title: "",
        text: "Tem certeza que deseja deletar a pessoa cadastrada?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sim",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteClientData(props.clientId);
          router.push("/gerenciar-cadastros");
          Swal.fire({
            position: "bottom-end",
            icon: "success",
            title: "Cadastro deletado com sucesso!",
            showConfirmButton: false,
            timer: 1500,
          });
          return;
        } else {
          router.push("/gerenciar-cadastros");
        }
      });
    };

    return {
      formData,
      handleSubmit,
      deleteClient,
      nameInput,
      errorInputName,
      errorInputCpf,
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
        margin-bottom: 5px;
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

      .invalid-name {
        border-color: $color-red !important;
        background-color: rgb(254, 203, 203) !important;
      }

      small {
        color: $color-red;
        display: block;
        text-align: start;
        width: 100%;
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

  @media (max-width: 600px) {
    form {
      grid-template-columns: 1fr !important;
    }
  }

  @media (max-width: 1000px) {
    margin-left: 0;

    > div {
      margin-top: 100px;
      min-height: 100%;
    }
  }
}
</style>
