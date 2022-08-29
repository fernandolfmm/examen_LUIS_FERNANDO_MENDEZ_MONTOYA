<template>
  <v-btn
    :small="$vuetify.breakpoint.mobile ? true : small"
    :large="$vuetify.breakpoint.mobile ? false : xLarge"
    :block="block"
    :loading="loading"
    :text="typeButton === 'text'"
    :outlined="typeButton === 'outlined'"
    :class="className"
    @click="$emit('click')"
    :color="color !== null ? color : 'secondary'"
    :disabled="disabled"
    :dark="dark"
    :type="submit ? 'submit' : undefined"
    style="margin: 5px"
    elevation="0"
  >
    {{ text }}
    <v-icon v-if="icon && !alignIcon" right>{{ icon }}</v-icon>
  </v-btn>
</template>

<script>
const props = {
  text: String,
  onClick: Function,
  icon: String,
  color: {
    default: null,
    type: String,
  },
  typeButton: {
    default: "",
    type: String,
  },
  alignIcon: {
    default: false,
    type: Boolean,
  },
  loading: {
    default: false,
    type: Boolean,
  },
  disabled: {
    default: false,
    type: Boolean,
  },
  block: {
    default: false,
    type: Boolean,
  },
  small: {
    default: true,
    type: Boolean,
  },
  xLarge: {
    default: false,
    type: Boolean,
  },
  className: {
    default: "",
    type: String,
  },
  changeIcon: {
    default: 700,
    type: Number,
  },
  dark: {
    default: false,
    type: Boolean,
  },
  submit: {
    default: false,
    type: Boolean,
  },
};

export default {
  methods: {
    execute() {
      if (this.onClick) {
        this.onClick();
      }
    },
  },
  props: props,
};
</script>

<style scoped></style>
