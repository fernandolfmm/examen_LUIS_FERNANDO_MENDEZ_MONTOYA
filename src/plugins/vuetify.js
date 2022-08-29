import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

const opts = {
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: "#007bff",
        secondary: "#17a2b8",
        disabled: "#6c757d",
      },
    },
  },
};

export default new Vuetify(opts);
