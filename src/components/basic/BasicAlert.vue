<template>
  <v-hover v-slot="{ hover }">
    <v-snackbar v-model="showMsg" :color="color" :timeout="hover ? -1 : timeout" absolute bottom right>
      {{ msg }}
      <v-progress-linear class="itemsBottom" color="white" :value="progressValue"></v-progress-linear>
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="showMsg = false"> <v-icon v-text="closeIcon" /> </v-btn>
      </template>
    </v-snackbar>
  </v-hover>
</template>

<script>
const props = {
  active: {
    default: false,
    type: Boolean,
  },
  color: {
    default: "error",
    type: String,
  },
  closeIcon: {
    default: "mdi-close",
    type: String,
  },
  msg: {
    default: "",
    type: String,
  },
  timeout: {
    default: 2500,
    type: Number,
  },
};

export default {
  data: () => ({
    progressValue: 0,
    auxProgress: 0,
    interval: undefined,
    hover1: false,
  }),
  mounted() {
    this.showMsg = this.active;
  },
  watch: {
    active(state) {
      this.progress(state);
    },
  },

  computed: {
    showMsg: {
      get() {
        return this.active;
      },
      set(val) {
        this.$emit("update:active", val);
        this.progressValue = 0;
        return val;
      },
    },
  },
  methods: {
    progress(state) {
      if (state) {
        this.interval = setInterval(() => {
          this.updateProgress();
          if (this.auxProgress > 100) {
            clearInterval(this.interval);
            this.actishowMsgve = false;
          }
        }, this.timeout / 10);
      }
    },
    updateProgress() {
      this.auxProgress += 10;
      this.progressValue = (this.auxProgress * this.timeout) / 2000;
    },
  },
  props: props,
};
</script>

<style scoped>
.itemsBottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
