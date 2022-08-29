<template>
  <v-text-field
    v-model="localvalue"
    :label="placeholder"
    single-line
    outlined
    color="primary"
    background-color="white"
    @input="(value) => Change(value)"
    :rules="[
      max16 ? rules.max16 : true,
      min8 ? rules.min8 : true,
      alfaNumeric ? rules.alfaNumeric : true,
      number ? rules.number : true,
      required ? rules.required : true,
    ]"
    :maxlength="length"
    :type="auxPass ? 'password' : 'text'"
    :append-icon="
      password ? (auxPass ? 'mdi-eye-outline' : 'mdi-eye-off-outline') : ''
    "
    @click:append="auxPass = !auxPass"
    elevation="0"
  >
    ></v-text-field
  >
</template>
<script>
const props = {
  value: {
    default: "",
    type: String,
  },
  placeholder: {
    default: "Ingrese el campo",
    type: String,
  },
  length: {
    default: undefined,
    type: Number,
  },
  max16: {
    default: false,
    type: Boolean,
  },
  password: {
    default: false,
    type: Boolean,
  },
  min8: {
    default: false,
    type: Boolean,
  },
  alfaNumeric: {
    default: false,
    type: Boolean,
  },
  number: {
    default: false,
    type: Boolean,
  },
  required: {
    default: false,
    type: Boolean,
  },
};

export default {
  data() {
    return {
      localvalue: this.value,
      auxPass: this.password,
      rules: {
        required: (v) => !!v || "El campo es obligatorio",
        max16: (v) => (v || "").length !== 16 || "Limite de caracteres",
        max200: (v) => (v || "").length <= 200 || "Limite de caracteres",
        min8: (v) => (v || "").length >= 8 || "MInimo 8 caracteres",
        alfaNumeric: (v) => {
          if (!!v && v !== "") {
            return /[A-Z]/.test(v) || "Debe contener al menos una mayuscula";
          } else {
            return true;
          }
        },
        number: (v) => {
          if (!!v && v !== "") {
            return /[0-9]/.test(v) || "Debe contener al menos un numero";
          } else {
            return true;
          }
        },
        onlyNumber: (v) => {
          if (!!v && v !== "") {
            return /^[0-9]+$/.test(v) || "Número inválido";
          } else {
            return true;
          }
        },
      },
    };
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
