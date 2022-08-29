<template>
  <v-tooltip :top="top" :left="left" :right="right" :bottom="bottom"
    ><template v-slot:activator="{ on, attrs }"><v-icon class="mr-2" size="22" :color="color" dark v-bind="attrs" v-on="on" :disabled="loading" v-text="icon" @click="$emit('onClick')" /></template><span v-text="label"
  /></v-tooltip>
</template>

<script>
const props = {
  onClick: Function,
  label: {
    default: "",
    type: String,
  },
  icon: {
    default: "",
    type: String,
  },
  color: {
    default: "primary",
    type: String,
  },
  loading: {
    default: false,
    type: Boolean,
  },
  top: {
    default: false,
    type: Boolean,
  },
  left: {
    default: false,
    type: Boolean,
  },
  right: {
    default: false,
    type: Boolean,
  },
  bottom: {
    default: false,
    type: Boolean,
  },
};

export default {
  props: props,
};
</script>

<style scoped></style>
