<template>
  <v-dialog v-model="estate" persistent scrollable :max-width="maxWidth" class="up">
    <v-card>
      <v-toolbar dense dark :color="color" elevation="2">
        <v-toolbar-title v-text="title" />
      </v-toolbar>
      <v-card-text>
        <v-container>
          <slot />
        </v-container>
      </v-card-text>
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
    default: "",
    type: String,
  },
  color: {
    default: "primary",
    type: String,
  },
  maxWidth: {
    default: "600px",
    type: String,
  },
};

export default {
  props: props,
};
</script>

<style scoped>
.up {
  position: relative !important;
  z-index: 1 !important;
}
</style>
