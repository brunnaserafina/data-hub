<template>
  <FormClientData :title="title" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FormClientData from "@/components/FormClientData.vue";

export default defineComponent({
  name: "ClientRegistrationView",
  components: { FormClientData },
  data() {
    return {
      title: "Novo Cadastro",
    };
  },
});
</script>
