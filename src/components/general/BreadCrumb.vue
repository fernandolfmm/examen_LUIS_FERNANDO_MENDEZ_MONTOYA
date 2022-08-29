<template>
  <v-breadcrumbs :items="actualPage">
    <template v-slot:item="{ item }">
      <v-breadcrumbs-item :href="item.path">
        <v-icon color="primary" v-text="item.icon" left />
        <span v-text="item.title" />
      </v-breadcrumbs-item>
    </template>
  </v-breadcrumbs>
</template>

<script>
const props = {};

export default {
  name: "breadcrumb",
  data: () => ({
    items: [
      { icon: "mdi-home", title: "Home", path: "/home" },
      {
        icon: "mdi-cogs",
        title: "REPORTES",
        children: [{ icon: "mdi-account", title: "Ordend ecompra", path: "/reporte" }],
      },
    ],
  }),
  computed: {
    actualPage() {
      let urls = [];
      for (let route of this.items) {
        if (route.children) {
          for (let route2 of route.children) {
            if (route2.path == this.$route.path) {
              urls.push({ icon: route.icon, title: route.title, path: route.path }, { icon: route2.icon, title: route2.title, path: route2.path });
            }
          }
        } else if (route.path == this.$route.path) {
          urls.push({ icon: route.icon, title: route.title, path: route.path });
        }
      }
      return urls;
    },
  },
  methods: {},
  props: props,
};
</script>

<style scoped></style>
