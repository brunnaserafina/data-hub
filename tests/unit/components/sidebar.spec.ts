import { mount } from "@vue/test-utils";
import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import SidebarMenu from "@/components/SidebarMenu.vue";
import ClientListView from "@/views/ClientListView.vue";
import ClientRegistrationView from "@/views/ClientRegistrationView.vue";

describe("SidebarMenu.vue", () => {
  const routes: Array<RouteRecordRaw> = [
    { path: "/", redirect: "/cadastrar-cliente" },
    { path: "/cadastrar-cliente", component: ClientRegistrationView },
    { path: "/gerenciar-cadastros", component: ClientListView },
  ];

  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  const wrapper = mount(SidebarMenu, {
    global: {
      plugins: [router],
    },
  });

  it("should render the SidebarMenu component", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("must contain a <div> element with the text 'Clientes'", () => {
    const divElement = wrapper.find("div");
    expect(divElement.exists()).toBe(true);
    expect(divElement.text()).toBe("Clientes");
  });

  it("must contain a link to '/cadastrar-cliente' with class 'page-active' if the route is '/cadastrar-cliente'", async () => {
    const mockRoute = {
      path: "/cadastrar-cliente",
    };
    const wrap = mount(SidebarMenu, {
      global: {
        mocks: {
          $route: mockRoute,
        },
      },
    });
    const linkElement = wrap.find("router-link[to='/cadastrar-cliente']");
    expect(linkElement.exists()).toBe(true);
    expect(linkElement.classes("page-active")).toBe(true);
  });

  it("must contain a link to '/gerenciar-cadastros' with the class 'page-active' if the route is '/gerenciar-cadastros'", async () => {
    const mockRoute = {
      path: "/gerenciar-cadastros",
    };
    const wrapper = mount(SidebarMenu, {
      global: {
        mocks: {
          $route: mockRoute,
        },
      },
    });
    const linkElement = wrapper.find("router-link[to='/gerenciar-cadastros']");
    expect(linkElement.exists()).toBe(true);
    expect(linkElement.classes("page-active")).toBe(true);
  });
});
