<template>
<div>
  <router-view />
</div>
</template>
<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import VueSession from "vue-session";
import Vuetify from "vuetify";

Vue.use(Vuetify);
Vue.use(VueAxios, axios);
Vue.use(VueSession);

export default {
  name: "App",
};
</script>
