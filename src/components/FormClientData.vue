<template>
  <section class="client-registration">
    <div>
      <h1>{{ title }}</h1>

      <form @submit.prevent="handleSubmit" class="form">
        <div class="colum1-2">
          <label for="name">Nome completo*</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Nome completo"
            v-model="formData.nome"
            required
            autofocus
          />
        </div>
        <div class="colum-1">
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
        <div class="buttons colum-1">
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
import { defineComponent, onMounted, ref } from "vue";
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
    const store = useStore();
    const formData = ref({
      nome: "",
      dataNascimento: "",
      cpf: "",
    });

    const fetchDataFromVuex = () => {
      const clientData = store.getters.getClientData;

      if (clientData && props.title === "Editar Cadastro") {
        formData.value.nome = clientData.nome;
        formData.value.dataNascimento = clientData.dataNascimento;
        formData.value.cpf = clientData.cpf;
      }
    };

    onMounted(() => {
      fetchDataFromVuex();
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
    };
  },
  directives: { maska: vMaska },
});
</script>

<style lang="scss">
.client-registration {
  margin-left: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;

  > div {
    background-color: white;
    width: 700px;
    padding: 30px;
    justify-content: flex-start;
    top: 0;
    bottom: 0;
  }

  h1 {
    text-transform: uppercase;
    font-size: 22px;
    text-align: start;
    position: relative;
    margin-bottom: 50px;
  }

  h1:after {
    content: "";
    height: 2px;
    width: 100%;
    display: block;
    position: absolute;
    background-color: #cccccc;
    margin-top: 5px;
  }

  form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .form input:focus {
    outline: none;
    border-color: #ffbb00;
    background: #ffffff;
    box-shadow: 0 0 0 2px #fea;
  }

  .colum1-2 {
    grid-column: 1/-1;
  }

  .colum-1 {
    grid-column: 1;
  }

  label {
    display: block;
    text-align: start;
    margin-bottom: 10px;
  }

  input {
    margin-bottom: 20px;
    width: min-content;
    background-color: #f7f7f7;
    border: 1px solid #ededed;
    height: 50px;
    border-radius: 10px;
    padding: 5px;
    box-sizing: border-box;
    width: 100%;
  }

  button {
    background-color: #ffb60d;
    border: none;
    width: 120px;
    height: 60px;
    border-radius: 10px;
    text-transform: uppercase;
    font-weight: 600;
    align-self: flex-start;
    cursor: pointer;
  }

  button:hover {
    background: linear-gradient(#ffb60d, #e59317);
  }

  .buttons {
    display: flex;
    justify-content: flex-start;
    gap: 30px;
  }

  .delete-button {
    background-color: red;
  }

  .delete-button:hover {
    background: linear-gradient(#ff4949, #e51717);
  }
}
</style>
