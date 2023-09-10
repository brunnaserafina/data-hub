<template>
  <section class="client-registration">
    <div>
      <h1>Novo cadastro</h1>

      <form @submit.prevent="handleSubmit" class="form">
        <div class="colum1-2">
          <label for="name">Nome completo*</label>
          <input
            type="text"
            id="name"
            name="name"
            regex="/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/"
            placeholder="Nome completo"
            v-model="formData.name"
            required
            autofocus
          />
        </div>
        <div class="colum-1">
          <label for="date">Data de nascimento</label>
          <input type="date" id="date" name="date" v-model="formData.date" />
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
        <button type="submit" class="colum-1">Salvar</button>
      </form>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { vMaska } from "maska";
import { cpf } from "cpf-cnpj-validator";
import { postClientData } from "../services/api";

export default defineComponent({
  name: "ClientRegistrationView",
  components: {},
  data() {
    return {
      formData: {
        name: "",
        date: "",
        cpf: "",
      },
    };
  },
  directives: { maska: vMaska },
  methods: {
    async handleSubmit(event: Event) {
      event.preventDefault();

      const nameIsCompleted = this.formData.name.length > 0;
      const nameIsValid =
        this.formData.name ===
        this.formData.name.replace(/[^a-zA-ZÀ-ÖØ-öø-ÿ\s]/g, ""); //regex to not allow numbers
      if (!nameIsCompleted || !nameIsValid) {
        alert(
          "O campo nome é obrigatório e não permite números, insira o nome completo da pessoa a ser cadastrada e tente novamente."
        );
        return;
      }

      const cpfIsValid = cpf.isValid(this.formData.cpf);
      if (cpfIsValid) {
        try {
          await postClientData(this.formData);
          alert("Pessoa cadastrada com sucesso!");
        } catch (err) {
          console.error(err);
          alert(
            "Houve algum erro durante o cadastro de usuário, tente novamente."
          );
        }
      } else {
        alert("O cpf digitado é invalido, corrija e tente novamente.");
      }
    },
  },
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
}
</style>
