<template>
  <v-app id="404" >
    <div class="itemsCenter mt-12">
    <v-img :src="logo" max-width="300"></v-img>
    </div>
    <v-container fluid fill-height>
      <v-layout align-center justify-center row>
        <div class="text-center">
          <lottie-animation ref="anim" :animationData="require('@/assets/animations/404.json')" :loop="true" :autoPlay="true" style="width: 100%; height: 400px" />
          <h1 class="my-3 headline primary--text">Pagina no encontrada</h1>
        </div>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import LottieAnimation from "lottie-web-vue";

export default {
  name: "pageNotFound",
  components: {
    LottieAnimation,
  },
  data: () => ({
    logo: require("@/assets/images/logo.svg"),
  }),
};
</script>

<style scoped>
h1 {
  font-size: 150px;
  line-height: 150px;
  font-weight: 700;
  color: white;
}
h2 {
  color: white;
}
</style>
