import { mount } from "@vue/test-utils";
import NavbarMenu from "@/components/NavbarMenu.vue";

describe("NavbarMenu.vue", () => {
  it("should render the NavbarMenu component", () => {
    const wrapper = mount(NavbarMenu);
    expect(wrapper.exists()).toBe(true);
  });

  it("must show the Scribe logo", () => {
    const wrapper = mount(NavbarMenu);
    expect(wrapper.find("img").exists()).toBe(true);
  });

  it("should display the welcome message", () => {
    const wrapper = mount(NavbarMenu);
    expect(wrapper.find("p").text()).toBe("Olá, seja bem vindo(a)!");
  });
});
