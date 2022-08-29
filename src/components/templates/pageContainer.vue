<template>
  <v-container fluid class="ma-0 pa-0">
    <div class="red-panel"></div>
    <div class="position">
      <bread-crumb></bread-crumb>
      <slot class="pt-0"></slot>
    </div>
  </v-container>
</template>

<script>
import { BreadCrumb } from "@/components";

const props = {};

export default {
  components: {
    BreadCrumb,
  },
  props: props,
};
</script>

<style scoped>
.red-panel {
  height: 200px;
  width: 100%;
  background: #e2574c !important;
  margin: 0;
  padding: 0;
  position: absolute;
}
.position {
  position: relative;
}
</style>
