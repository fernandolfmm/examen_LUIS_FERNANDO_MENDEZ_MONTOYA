<template>
  <v-dialog ref="dialog" v-model="dialog" :close-on-content-click="false" transition="scale-transition" offset-y max-width="300px" min-width="auto" >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field v-model="localvalue" :label="label" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" :hide-details="hideDetails" :dark="dark" dense outlined></v-text-field>
    </template>
    <v-date-picker v-model="localvalue" :active-picker.sync="activePicker" :max="offLimit ? false : new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10)" min="1950-01-01" @change="save" locale="es"></v-date-picker>
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
  offYear: {
    default: false,
    type: Boolean,
  },
  offLimit: {
    default: false,
    type: Boolean,
  },
  hideDetails: {
    default: false,
    type: Boolean,
  },
  dark: {
    default: false,
    type: Boolean,
  },
};

export default {
  data() {
    return {
      activePicker: null,
      date: null,
      dialog: false,
    };
  },
  watch: {
    dialog(val) {
      if (!this.offYear) {
        val && setTimeout(() => (this.activePicker = "YEAR"));
      }
    },
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
    save(date) {
      this.$refs.dialog.save(date);
    },
  },
};
</script>
<style scoped></style>
