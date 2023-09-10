<template>
  <section class="client-registration">
    <div>
      <h1>Novo cadastro</h1>

      <form class="form">
        <div class="colum1-2">
          <label for="name">Nome completo*</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Nome completo"
            autofocus
          />
        </div>
        <div class="colum-1">
          <label for="date">Data de nascimento</label>
          <input type="date" id="date" name="date" />
        </div>
        <div>
          <label for="">CPF*</label>
          <input
            type="text"
            id="cpf"
            name="cpf"
            placeholder="Ex.: 000.000.000-00"
          />
        </div>
        <button class="colum-1">Salvar</button>
      </form>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ClientRegistrationView",
  components: {},
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
    width: 600px;
    padding: 20px;
    justify-content: flex-start;
    border-radius: 10px;
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
