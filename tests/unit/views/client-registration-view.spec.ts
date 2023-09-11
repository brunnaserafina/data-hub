import { mount } from "@vue/test-utils";
import ClientRegistrationView from "@/views/ClientRegistrationView.vue";
import testStore from "../utils/test-store";

describe("ClientRegistrationView.vue", () => {
  it("must render the FormClientData component with title 'Novo Cadastro'", () => {
    const wrapper = mount(ClientRegistrationView, {
      props: {
        title: "Novo Cadastro",
        clientId: 1,
      },
      global: {
        plugins: [testStore],
      },
    });

    expect(wrapper.findComponent({ name: "FormClientData" }).exists()).toBe(
      true
    );

    expect(
      wrapper.findComponent({ name: "FormClientData" }).props("title")
    ).toBe("Novo Cadastro");
  });
});
