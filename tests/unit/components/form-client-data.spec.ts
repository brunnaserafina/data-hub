import { mount } from "@vue/test-utils";
import FormClientData from "@/components/FormClientData.vue";
import testStore from "../utils/test-store";
import { ref } from "vue";
import IClient from "@/interfaces/IClient";

describe("FormClientData.vue", () => {
  it("deve renderizar corretamente", () => {
    const wrapper = mount(FormClientData, {
      props: {
        title: "Editar Cadastro",
        clientId: 1,
      },
      global: {
        plugins: [testStore],
      },
    });

    expect(wrapper.text()).toContain("Editar Cadastro");
  });

  it("valida o preenchimento do campo Nome completo", async () => {
    const wrapper = mount(FormClientData, {
      props: {
        title: "Novo Cadastro",
        clientId: 1,
      },
      global: {
        plugins: [testStore],
      },
    });

    await wrapper.find("form").trigger("submit.prevent");
    expect(wrapper.find(".invalid-input").exists()).toBe(true);
  });

  it("valida o preenchimento do campo CPF", async () => {
    const wrapper = mount(FormClientData, {
      props: {
        title: "Novo Cadastro",
        clientId: 1,
      },
      global: {
        plugins: [testStore],
      },
    });

    const formData = ref<IClient>({
      nome: "",
      dataNascimento: "",
      cpf: "",
    });

    formData.value.cpf = "464.194.750-31"; //cpf generate site https://www.4devs.com.br/gerador_de_cpf

    await wrapper.find("form").trigger("submit.prevent");
    expect(wrapper.find(".invalid-input").exists()).toBe(true);
  });

  it("invalida o preenchimento do campo CPF que não existe", async () => {
    const wrapper = mount(FormClientData, {
      props: {
        title: "Novo Cadastro",
        clientId: 1,
      },
      global: {
        plugins: [testStore],
      },
    });

    const formData = ref<IClient>({
      nome: "",
      dataNascimento: "",
      cpf: "",
    });

    formData.value.cpf = "000.100.000-00";

    await wrapper.find("form").trigger("submit.prevent");
    expect(wrapper.find(".invalid-input").exists()).toBe(true);
  });
});
