<template>
  <v-dialog v-model="estate" persistent max-width="290">
    <v-card>
      <v-card-title class="headline" v-text="title" />
      <v-card-text v-text="msg" />
      <v-card-actions>
        <v-spacer />
        <slot class="text-center" name="buttons" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
const props = {
  estate: {
    default: false,
    type: Boolean,
  },
  title: {
    default: "Aviso",
    type: String,
  },
  msg: {
    default: "¿Desea eliminar el registro?",
    type: String,
  },
};

export default {
  props: props,
};
</script>

<style scoped></style>
