import Vue from "vue";
import axios from "axios";
import jwt_decode from "jwt-decode";

const host = process.env.VUE_APP_API_SERVER;
const path = "/api/check";

export default {
  check() {
    let jwt = Vue.prototype.$session.get("jwt");
    axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
    return axios
      .get(host + path)
      .then((response) => {
        for (let i = 0; i < response.data.roles.length; i++) {
          let data = jwt_decode(jwt);
          Vue.prototype.$session.set("user", data.user.username);
          Vue.prototype.$session.set("roles", response.data.roles);
          Vue.prototype.$session.set("puesto", data.user.positionName);

        }
        return true;
      })
      .catch((error) => {
        Vue.prototype.$session.destroy();
        return false;
      });
  },
  permission() {
    let jwt = Vue.prototype.$session.get("jwt");
    let username = Vue.prototype.$session.get("userName");

    axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;

    return axios
      .get(host + "/api/user/permissions/" + username)
      .then((response) => {
        Vue.prototype.$session.set("puesto", response.data.user.positionName);
      })
      .catch((error) => {
        console.log(error)
        Vue.prototype.$session.destroy();
      });
  },
};
