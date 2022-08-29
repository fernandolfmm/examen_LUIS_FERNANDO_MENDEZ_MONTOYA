<template>
  <v-menu max-width="400" v-model="menu" :close-on-content-click="false" offset-x>
    <template v-slot:activator="{ on, attrs }">
      <v-btn text class="text-normal" v-bind="attrs" v-on="on">
        {{ username }}
        <v-icon v-text="avatar" dark right />
      </v-btn>
    </template>
    <v-card>
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-avatar color="primary">
              <v-icon v-text="avatar" dark />
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="username" />
            <div v-for="(rol, n) in roles" :key="n">
              <v-list-item-subtitle v-text="rol" />
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-card-actions>
        <span class="text-caption"> v{{ version }} </span>
        <v-spacer></v-spacer>
        <slot class="text-center" name="exit" />
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
import "animate.css";
import { BasicBtn } from "@/components";

const props = {
  username: {
    default: "",
    type: String,
  },
  roles: {
    default: [],
    type: Array,
  },
  version: {
    default: "0",
    type: String,
  },
  avatar: {
    default: "mdi-account",
    type: String,
  },
};

export default {
  components: {
    BasicBtn,
  },
  data: () => ({
    menu: false,
  }),
  props: props,
};
</script>

<style scoped>
.text-normal {
  text-transform: none !important;
}
.main-title {
  font-size: 28px;
  color: #222665;
}
</style>
