<template>
  <v-dialog ref="dialog" v-model="modal" :return-value.sync="localvalue" persistent width="290px">
    <template v-slot:activator="{ on, attrs }">
      <v-text-field v-model="localvalue" :label="label" :prepend-icon="icon" readonly v-bind="attrs" v-on="on" outlined dense></v-text-field>
    </template>
    <v-time-picker v-if="modal" v-model="localvalue" full-width>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="modal = false"> Cancel </v-btn>
      <v-btn text color="primary" @click="$refs.dialog.save(localvalue)"> OK </v-btn>
    </v-time-picker>
  </v-dialog>
</template>
<script>
const props = {
  value: {
    default: "",
    type: String,
  },
  label: {
    default: "Ingrese el campo",
    type: String,
  },
  icon: {
    default: "mdi-clock-time-four-outline",
    type: String,
  },
};

export default {
  data() {
    return {
      modal: false,
    };
  },
  computed: {
    localvalue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
        return val;
      },
    },
  },
  props: props,
  methods: {
    Change(prop) {
      this.$emit("input", prop);
    },
  },
};
</script>
<style scoped></style>
