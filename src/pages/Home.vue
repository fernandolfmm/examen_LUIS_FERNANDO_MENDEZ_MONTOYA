<template>
  <v-container fluid fill-height>
    <v-row>
      <v-col cols="12">
        <v-img class="animate__animated animate__rollIn mx-auto" :src="logo" max-width="800" contain />
      </v-col>
    </v-row>
    <v-snackbar v-model="success" color="success" :timeout="2500" bottom right>
      {{ msgSuccess }}
    </v-snackbar>
    <v-snackbar v-model="error" color="error" :timeout="2500" bottom right>
      {{ msgError }}
    </v-snackbar>
  </v-container>
</template>

<script>
import "animate.css";

export default {
  name: "home",
  data: () => ({
    loading: false,
    success: false,
    msgSuccess: "",
    error: false,
    msgError: "",
    modulos: [],
    logo: require("@/assets/images/logo.svg"),
  }),
  methods: {},
};
</script>

<style scoped></style>
