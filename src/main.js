import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import vuetify from "@/plugins/vuetify";
import styles from "./app.scss";
import LottieAnimation from "lottie-web-vue";
import { Loader, PageContainer } from "@/components";

Vue.component('Loader', Loader);
Vue.component('PageContainer', PageContainer);
Vue.use(LottieAnimation);
Vue.config.productionTip = false;

new Vue({
  store,
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
