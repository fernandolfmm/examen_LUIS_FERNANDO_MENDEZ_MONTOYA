<template>
  <div>
    <Bread-Crumb v-if="!hideRoute" />
    <v-card class="elevation-5 mt-5 mx-5">
      <v-toolbar dense dark :color="color" elevation="2">
        <v-toolbar-title v-text="title" />
      </v-toolbar>
      <v-card-title>
        <slot class="text-center" name="buttons" />
        <v-spacer></v-spacer>
        <slot class="text-center" name="search" />
      </v-card-title>
      <slot></slot>
    </v-card>
  </div>
</template>

<script>
import { BreadCrumb } from "@/components";

const props = {
  title: {
    default: "",
    type: String,
  },
  color: {
    default: "primary",
    type: String,
  },
  hideRoute: {
    default: false,
    type: Boolean,
  },
};

export default {
  components: {
    BreadCrumb,
  },
  props: props,
};
</script>

<style scoped></style>
