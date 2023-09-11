<template>
  <FormClientData :title="title" :clientId="clientId" />
</template>

<script lang="ts">
import FormClientData from "@/components/FormClientData.vue";
import { defineComponent } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "ClientEditView",
  components: { FormClientData },
  data() {
    return {
      title: "Editar Cadastro",
    };
  },
  setup() {
    const route = useRoute();
    const clientId = Number(route.params.clientId);

    return {
      clientId,
    };
  },
});
</script>
