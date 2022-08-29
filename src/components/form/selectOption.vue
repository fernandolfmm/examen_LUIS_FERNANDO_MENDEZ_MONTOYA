<template>
  <div>
    <v-card class="elevation-5 centerElement text-center" max-width="400">
      <v-toolbar dense dark color="primary" elevation="2">
        <v-toolbar-title>{{ title }}</v-toolbar-title>
      </v-toolbar>
      <v-list>
        <span v-if="viewData.length == 0" class="text-body-1 primary--text">Elementos no disponibles
          </span>
        <v-text-field prepend-icon="mdi-magnify" label="Buscar" v-model="searchData" clearable dense outlined class="mr-2 ml-2 mb-2" v-if="viewData.length > 0" hide-details></v-text-field>
        <v-divider></v-divider>

        <v-list-item-group v-model="choice" class="scrollStyle" color="primary" style="max-height: 400px; overflow: scroll; overflow-x: hidden">
          <div v-for="(item, i1) in viewData" :key="i1">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title v-text="item[dataKey]"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
        </v-list-item-group>
        <div v-if="viewData.length == 0">
          <lottie-animation ref="anim" :animationData="require('@/assets/animations/loader.json')" :loop="true" :autoPlay="true" style="width: 100%; height: 300px" />
          </div>
      </v-list>
    </v-card>
  </div>
</template>
<script>
import _ from "lodash";
import LottieAnimation from "lottie-web-vue";

const props = {
  data: {
    default: [],
    type: Array,
  },
  dataKey: {
    default: "nombre",
    type: String,
  },
  result: {
    default: {},
    type: Object,
  },
  title: {
    default: "Opciones",
    type: String,
  },
};

export default {
    components: {
    LottieAnimation,
  },
  data() {
    return {
      searchData: null,
      viewData: this.data,
      viewDataBackup: this.data,
      choice: null,
    };
  },
  watch: {
    searchData(state) {
      this.orderList(state, "viewData");
    },
    choice(data) {
      this.$emit("update:result", this.viewData[data]);
    },
    data() {
      this.viewData = this.data;
      this.viewDataBackup = this.data;
    },
  },
  props: props,
  methods: {
    Change(prop) {
      this.$emit("input", prop);
    },
    orderList(state, array) {
      let backupArray = array + "Backup";
      let key = this.dataKey;
      this[array] = _.filter(this[backupArray], function (o) {
        return o[key].toLowerCase().indexOf(state.toLowerCase()) >= 0;
      });
    },
  },
};
</script>
<style scoped>
.centerInfo {
  padding: 15px;
}
.scrollStyle {
  scrollbar-color: #6c14146b #fcfcfc00 !important;
  scrollbar-base-color: rgba(234, 246, 248, 0.137);
}
::-webkit-scrollbar {
  width: 12px;
}
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 0px rgba(0, 0, 0, 0);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  border-radius: 5px;
  -webkit-box-shadow: inset 500px 10px 10px #6c14146b;
}
.centerElement {
  margin-left: auto;
  margin-right: auto;
}
</style>
