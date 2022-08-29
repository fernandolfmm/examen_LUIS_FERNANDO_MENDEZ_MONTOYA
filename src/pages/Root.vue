<template>
  <v-app id="root" style="overflow: hidden">
    <v-app-bar dark app dense elevate-on-scroll color="primary" class="app-sidemenu">
      <v-btn
              icon
              @click="mini = !mini"
            >
              <v-icon>{{mini ? 'mdi-menu' : 'mdi-close'}}</v-icon>
            </v-btn>
      <v-col cols="2" class="text-center">
        

        <span v-text="'Versión: ' + version" />
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="2" class="text-center">
        <v-btn block text small elevation="0" :loading="loading" @click.native="logout()">
          Cerrar sesión
          <v-icon right>mdi-logout</v-icon>
        </v-btn>
      </v-col>
    </v-app-bar>
    <v-navigation-drawer dark app :mini-variant.sync="mini" color="primary" class="app-sidemenu">
      <v-list dense nav>
        <v-list-item class="text-center pa-0">
          <v-list-item-content class="text-center">
            <v-list-item-title width="100" class="title pt-1">
              <div v-if="!mini">
              <div class="itemsCenter">
              <v-img :src="main" max-width="150"/>
              </div>
              </div>
              <div v-else>
              <div class="itemsCenter">
              <v-img :src="main" max-width="40"/>
              </div>
              </div>

            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <template v-for="item in items">
          <template v-if="item.children">
            <v-list-group :prepend-icon="item.icon" :key="item.title" :value="openSubMenu($route.path, item.children)">
              <template v-slot:activator>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </template>
              <template>
                <div v-for="(child, i) in item.children" :key="i">
                  <v-list-item :to="item.children[i].path" link>
                    <v-list-item-icon>
                      <v-icon :class="!hover ? 'marginIcon' : ''" v-text="child.icon" />
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title v-text="child.title" />
                    </v-list-item-content>
                  </v-list-item>
                </div>
              </template>
            </v-list-group>
          </template>
          <v-list-item v-else :key="item.title" :to="item.path" link>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title active>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider class="ma-1"></v-divider>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-main class="grey lighten-4">
      <Notification :open="notify"></Notification>

      <router-view></router-view>
      <v-snackbar v-model="success" color="success" :timeout="2500" bottom right>
        {{ msgSuccess }}
      </v-snackbar>
      <v-snackbar v-model="error" color="error" :timeout="2500" bottom right>
        {{ msgError }}
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script>
import { UserMenu, BasicBtn, Notification } from "@/components";

export default {
  name: "root",
  components: {
    UserMenu,
    BasicBtn,
    Notification,
  },
  data: () => ({
    host: process.env.VUE_APP_API_SERVER,
    version: process.env.VUE_APP_VERSION,
    name: process.env.VUE_APP_NAME,
    logo: require("@/assets/images/logo.svg"),
    main: require("@/assets/images/logo.svg"),
    username: "",
    position: "",
    roles: [],
    path: "/api/logout",
    loading: false,
    success: false,
    msgSuccess: "",
    error: false,
    msgError: "",
    notify: false,
    mini: true,
    items: [
      { icon: "mdi-home", title: "Home", path: "/home" },
      { icon: "mdi-file", title: "Reportes", path: "/reporte" },
    ],
  }),
  mounted() {
    this.check();
  },
  methods: {
    check() {
      this.username = this.$session.get("userName");
      this.roles = this.$session.get("roles");
      this.position = this.$session.get("puesto");
      console.log(this.$session.getAll())
    },
    logout() {
      this.loading = true;
      if (this.$session.exists()) {
        this.axios
          .post(this.host + this.path)
          .then((response) => {
            this.$session.destroy();
            this.$router.push("/login");
          })
          .catch((error) => {
            this.error = true;
            this.msgError = error.response.data.message;
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        this.$router.push("/login");
      }
    },
    home() {
      if (this.$route.path !== "/home") {
        this.$router.push("/home");
      }
    },
    openSubMenu(location, arrayLocation) {
      let open = false;
      for (let i = 0; i < arrayLocation.length; i++) {
        if (location === arrayLocation[i].path) {
          open = true;
          break;
        }
      }
      return open;
    },
  },
};
</script>

<style scoped>
.app-sidemenu {
  z-index: 9999999999 !important;
}
</style>
