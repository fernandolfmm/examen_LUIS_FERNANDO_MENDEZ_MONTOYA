<template>
  <v-row no-gutters>
    <v-col cols="12" sm="5">
      <div>
        <v-card class="elevation-5 centerElement text-center" max-width="400">
          <v-toolbar dense dark color="primary" elevation="2">
            <v-toolbar-title>Elementos no seleccionados</v-toolbar-title>
          </v-toolbar>
          <v-list>
            <span v-if="noSelect.length == 0" class="text-body-1 primary--text">Elementos no disponibles
          </span>
            <v-text-field
                  prepend-icon="mdi-magnify"
                  label="Elementos no seleccionados"
                  v-model="searchNoSelect"
                  clearable
                  dense outlined
                  class="mr-2 ml-2 mb-2"
                  v-if="noSelect.length > 0"
                  hide-details
                ></v-text-field>
                <v-divider></v-divider>
            <v-list-item-group v-model="model1" class="scrollStyle" multiple color="primary" style="max-height: 300px; overflow: scroll; overflow-x: hidden">
              <div v-for="(item, i1) in noSelect" :key="i1">
                <v-list-item>
                  <v-list-item-content @click="pass(item, 'left')">
                    <v-list-item-title v-text="item[dataKey]"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </div>
            </v-list-item-group>
             <div v-if="noSelect.length == 0">
          <lottie-animation ref="anim" :animationData="require('@/assets/animations/loader.json')" :loop="true" :autoPlay="true" style="width: 100%; height: 300px" />
          </div>
          </v-list>
        </v-card>
      </div>
    </v-col>
    <v-col style="display: flex; justify-content: center; align-items: center" cols="12" sm="2">
      <div>
        <v-btn icon color="primary" x-large @click="rightFunction()">
          <v-icon v-text="iconRight"></v-icon>
        </v-btn>
        <br />
        <v-btn icon color="primary" x-large @click="leftFunction()">
          <v-icon v-text="iconLeft"></v-icon>
        </v-btn>
      </div>
    </v-col>
    <v-col cols="12" sm="5">
      <template>
        <v-card class="elevation-5 centerElement text-center" max-width="400">
          <v-toolbar dense dark color="primary" elevation="2">
            <v-toolbar-title>Elementos seleccionados</v-toolbar-title>
          </v-toolbar>
          <v-list>
            <span v-if="select.length == 0" class="text-body-1 primary--text">Elementos no disponibles
          </span>
            <v-text-field
                  prepend-icon="mdi-magnify"
                  label="Elementos seleccionados"
                  v-model="searchSelect"
                  clearable
                  dense outlined
                  class="mr-2 ml-2 mb-2"
                  v-if="select.length > 0"
                  hide-details
                ></v-text-field>
                <v-divider></v-divider>
            <v-list-item-group v-model="model2" multiple color="primary" style="max-height: 300px; overflow: scroll; overflow-x: hidden">
              <div v-for="(item, i2) in select" :key="i2">
                <v-list-item>
                  <v-list-item-content @click="pass(item, 'right')">
                    <v-list-item-title v-text="item[dataKey]"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </div>
            </v-list-item-group>
            <div v-if="select.length == 0">
          <lottie-animation ref="anim" :animationData="require('@/assets/animations/loader.json')" :loop="true" :autoPlay="true" style="width: 100%; height: 300px" />
          </div>
          </v-list>
        </v-card>
      </template>
    </v-col>
  </v-row>
</template>
<script>
import _ from 'lodash';
import LottieAnimation from "lottie-web-vue";

const props = {
  selectArray: {
    default: [],
    type: Array,
  },
  noSelectArray: {
    default: [],
    type: Array,
  },
  dataKey:{
    default: 'nombre',
    type: String,
  },
  iconRight:{
    default: 'mdi-arrow-right-bold-outline',
    type: String
  },
  iconLeft:{
    default: 'mdi-arrow-left-bold-outline',
    type: String
  },
};

export default {
  components: {
    LottieAnimation,
  },
  data() {
    return {
      model1: [],
      model2: [],
      searchNoAso: [],
      searchAso: [],
      auxselect: [],
      auxnoSelect: [],
      searchRoute: '',
      searchNoSelect: null,
      searchSelect: null,
      noSelect: this.noSelectArray,
      select: this.selectArray,
      noSelectBackup: this.noSelectArray,
      selectBackup: this.selectArray,
    };
  },
   watch: {
    searchNoSelect(state) {
      this.orderList(state, 'noSelect')
    },
    searchSelect(state) {
      this.orderList(state, 'select')
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
    Change(prop) {
      this.$emit("input", prop);
    },
    pass(data, side) {
      let valid = true;
      if (side === "left") {
        for (let i = 0; i < this.noSelect.length; i++) {
          if (data == this.noSelect[i]) {
            for (let i = 0; i < this.auxselect.length; i++) {
              if (data == this.noSelect[i]) {
                valid = false;
              }
            }
          }
        }
        if (valid) {
          this.auxselect.push(data);
          this.searchAso.push(data);
        }
      }
      if (side === "right") {
        for (let i = 0; i < this.select.length; i++) {
          if (data == this.select[i]) {
            for (let i = 0; i < this.auxnoSelect.length; i++) {
              if (data == this.select[i]) {
                valid = false;
              }
            }
          }
        }

        if (valid) {
          this.auxnoSelect.push(data);
          this.searchNoAso.push(data);
        }
      }
    },
    rightFunction() {
      for (let i = 0; i < this.auxselect.length; i++) {
        this.select.unshift(this.auxselect[i]);
        for (let j = 0; j < this.noSelect.length; j++) {
          if (this.auxselect[i] == this.noSelect[j]) {
            this.noSelect.splice(j, 1);
          }
        }
        for (let j = 0; j < this.searchNoAso.length; j++) {
          if (this.auxselect[i] == this.searchNoAso[j]) {
            this.searchNoAso.splice(j, 1);
          }
        }
      }
      this.model1 = [];
      this.auxselect = [];
  this.cleanData()

    },
    leftFunction() {
      for (let i = 0; i < this.auxnoSelect.length; i++) {
        this.noSelect.unshift(this.auxnoSelect[i]);
        for (let j = 0; j < this.select.length; j++) {
          if (this.auxnoSelect[i] == this.select[j]) {
            this.select.splice(j, 1);
          }
        }

        for (let j = 0; j < this.searchAso.length; j++) {
          if (this.auxnoSelect[i] == this.searchAso[j]) {
            this.searchAso.splice(j, 1);
          }
        }
      }
      this.model2 = [];
      this.auxnoSelect = [];
  this.cleanData()
    },
    cleanData(){
      console.log(_.uniqBy(this.noSelect, this.dataKey))
      this.noSelect = _.uniqBy(this.noSelect, this.dataKey);
      this.select =  _.uniqBy(this.select, this.dataKey);
      this.noSelectBackup = this.noSelect;
      this.selectBackup = this.select;
    },
    orderList(state, array){
      let backupArray = array + 'Backup'
      let key = this.dataKey
      this[array] = _.filter(
      this[backupArray], function(o) {
       return o[key].toLowerCase().indexOf(state.toLowerCase()) >= 0;
    }
);
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
