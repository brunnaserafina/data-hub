import { mount } from "@vue/test-utils";
import ClientEditView from "@/views/ClientEditView.vue";
import testStore from "../utils/test-store";

describe("ClientEditView.vue", () => {
  it("must render the FormClientData component with title 'Edit Registration'", () => {
    const clientId = 1;
    const wrapper = mount(ClientEditView, {
      global: {
        plugins: [testStore],
        stubs: ["router-link"],
      },
      data() {
        return {
          title: "Editar Cadastro",
        };
      },
      setup() {
        return {
          clientId,
        };
      },
    });

    expect(wrapper.findComponent({ name: "FormClientData" }).exists()).toBe(
      true
    );

    expect(
      wrapper.findComponent({ name: "FormClientData" }).props("title")
    ).toBe("Editar Cadastro");
  });

  it("must pass the clientId of the route to the FormClientData component", () => {
    const clientId = 1;
    const wrapper = mount(ClientEditView, {
      global: {
        plugins: [testStore],
        stubs: ["router-link"],
      },
      data() {
        return {
          title: "Editar Cadastro",
        };
      },
      setup() {
        return {
          clientId,
        };
      },
    });

    expect(
      wrapper.findComponent({ name: "FormClientData" }).props("clientId")
    ).toBe(clientId);
  });
});
