import { mount } from "@vue/test-utils";
import ClientListView from "@/views/ClientListView.vue";

describe("ClientListView.vue", () => {
  it("should render the customers table", () => {
    const wrapper = mount(ClientListView);

    expect(wrapper.find(".table").exists()).toBe(true);
  });

  it("should allow searching for customers by name", async () => {
    const wrapper = mount(ClientListView, {
      data() {
        return {
          dataClient: [{ id: 1, nome: "John Doe" }],
          searchClient: "John",
        };
      },
    });

    await wrapper.find("input[type='search']").setValue("John Doe");
    expect(wrapper.vm.searchClient).toBe("John Doe");
  });
});
