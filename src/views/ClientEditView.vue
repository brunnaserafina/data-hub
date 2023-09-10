<template>
  <FormClientData :title="title" />
</template>

<script lang="ts">
import FormClientData from "@/components/FormClientData.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ClientEditView",
  components: { FormClientData },
  data() {
    return {
      title: "Editar Cadastro",
    };
  },
});
</script>

<style lang="scss"></style>
