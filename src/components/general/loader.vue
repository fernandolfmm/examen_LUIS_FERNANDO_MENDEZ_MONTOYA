<template>
  <v-overlay :absolute="true" :value="loading" class="text-center up">
    <lottie-animation ref="anim" :animationData="require('@/assets/animations/' + animation + '.json')" :loop="true" :autoPlay="true" style="width: 100%; height: 250px" />
  </v-overlay>
</template>

<script>
import LottieAnimation from "lottie-web-vue";

const props = {
  loading: {
    default: false,
    type: Boolean,
  },
  animation: {
    default: "loader",
    type: String,
  },
};

export default {
  components: {
    LottieAnimation,
  },
  props: props,
};
</script>

<style scoped>
.up {
  position: absolute !important;
  z-index: 999 !important;
}
</style>
