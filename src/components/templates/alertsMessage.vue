<template>
  <v-dialog v-model="estate" persistent max-width="400" style="overflow-x: hidden">
    <v-card>
      <v-card-text>
        <lottie-animation ref="anim" :animationData="require('@/assets/animations/check.json')" :loop="true" :autoPlay="true" style="width: 100%; height: 200px" />
        <div class="itemsCenter">
          <h1>Pago exitoso</h1>
        </div>
      </v-card-text>
      <v-card-actions>
        <slot class="text-center" name="close" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import LottieAnimation from "lottie-web-vue";

const props = {
  estate: {
    default: false,
    type: Boolean,
  },
};
export default {
  components: {
    LottieAnimation,
  },
  data: () => ({
  }),
  props: props,
};
</script>

<style scoped>
</style>
