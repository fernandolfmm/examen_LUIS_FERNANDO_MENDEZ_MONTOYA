<template>
  <div>
    <v-navigation-drawer v-model="open" absolute temporary right  class="grey lighten-5">
      <div class="header-style pa-6">
        <v-row>
          <v-col cols="10">
            <v-toolbar-title class="white--text"> Notificaciones </v-toolbar-title>
          </v-col>
          <v-col cols="2">
            <v-btn fab color="white" bottom x-small dense outlined @click="fillterSection = !fillterSection">
              <v-icon>{{ fillterSection ? "mdi-close" : "mdi-magnify" }}</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12" v-if="fillterSection">
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="search" prepend-icon="mdi-magnify" label="Buscar" clearable dense outlined hide-details v-on:input="orderList()" dark></v-text-field>
              </v-col>
              <v-col cols="12">
                <Date-Picker v-model="begin" label="Fecha inicio" offYear hideDetails offLimit v-on:input="orderList()" dark/>
              </v-col>
              <v-col cols="12">
                <Date-Picker v-model="end" label="Fecha fin" offYear hideDetails offLimit v-on:input="orderList()" dark/>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>
      <v-tabs v-model="tab" align-with-title background-color="primary" center-active dark>
        <v-tabs-slider color="yellow"></v-tabs-slider>

        <v-tab v-for="(item, i) in tabTitles" :key="i">
          {{ item }}
        </v-tab>
      </v-tabs>

      <v-divider></v-divider>
      <v-tabs-items v-model="tab" class="grey lighten-5">
        <v-tab-item v-for="item in tabTitles" :key="item">
          <v-list two-line>
            <v-list-item-group active-class="primary--text" multiple>
              <template v-for="(item, index) in items">
                <v-list-item :key="item.title">
                  <template v-slot:default="{ active }">
                    <v-list-item-content>
                      <v-list-item-title v-text="item.title"></v-list-item-title>

                      <v-list-item-subtitle class="text--primary" v-text="item.details"></v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-list-item-action-text v-text="dateFormat(item.time)"></v-list-item-action-text>
                      <v-icon> mdi-check </v-icon>
                    </v-list-item-action>
                  </template>
                </v-list-item>

                <v-divider v-if="index < items.length - 1" :key="index" light></v-divider>
              </template>
            </v-list-item-group>
            <div v-if="items.length == 0" class="text-center">
              <lottie-animation ref="anim" :animationData="require('@/assets/animations/loader.json')" :loop="true" :autoPlay="true" style="width: 100%; height: 300px" />
              <h2 class="primary--text">Notificaciones no disponibles</h2>
            </div>
          </v-list>
        </v-tab-item>
      </v-tabs-items>
    </v-navigation-drawer>
  </div>
</template>

<script>
import _ from "lodash";
import LottieAnimation from "lottie-web-vue";
import moment from "moment";
import { DatePicker } from "@/components";

const props = {
  open: {
    default: false,
    type: Boolean,
  },
};

export default {
  components: {
    LottieAnimation,
    DatePicker,
  },
  data: () => ({
    search: "",
    begin: null,
    end: null,
    drawer: null,
    tab: 2,
    fillterSection: false,
    tabTitles: ["NO LEIDOS", "LEIDOS"],
    items: [
      {
        time: moment().format(),
        details: `Prueba`,
        title: "Notificacion de prueba 1",
      },
      {
        time: "2022-07-22T19:04:11-05:00",
        details: `Prueba`,
        title: "Notificacion de prueba 2",
      },
      {
        time: "2022-07-22T19:01:11-05:00",
        details: `Prueba`,
        title: "Notificacion de prueba 3",
      },
      {
        time: "2022-06-22T19:04:11-05:00",
        details: `Prueba`,
        title: "Notificacion de prueba 4",
      },
    ],
    itemsBackup: [],
  }),
  mounted() {
    this.itemsBackup = this.items;
  },
  methods: {
    orderList() {
      let str = this.search;
      let end = this.end;
      let begin = this.begin;
      this.items = _.filter(this.itemsBackup, function (o) {
        return (begin ? new Date(o.time) > new Date(begin) : true) && (end ? new Date(o.time) < new Date(end) : true) && o.title.toLowerCase().indexOf(str.toLowerCase()) >= 0;
      });
    },
    dateFormat(date) {
      console.log(moment().diff(date, "days"));
      if (moment().diff(date, "days") > 1) {
        return moment(date).format("DD/MM/YYYY");
      } else {
        return moment(date, "YYYYMMDD H:mm:ss").locale("es").fromNow();
      }
    },
  },
  props: props,
};
</script>

<style scoped>
.header-style {
  background-color: #6c1414;
}
</style>
