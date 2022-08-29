<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat>
          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday" :disabled="focus == ''"> Hoy </v-btn>
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small> mdi-chevron-left </v-icon>
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon small> mdi-chevron-right </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ upperString($refs.calendar.title) }}
            <slot name="right-title"></slot>
          </v-toolbar-title>
            <slot name="actions"></slot>

          <v-spacer></v-spacer>

          <v-menu bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right> mdi-menu-down </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Dia</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Semana</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Mes</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 días</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar ref="calendar" v-model="focus" color="primary" :events="events" :event-color="getEventColor" :type="type" @click:event="showEvent" @click:more="viewDay" @click:date="viewDay" locale="es"></v-calendar>
        <v-menu v-model="selectedOpen" :close-on-content-click="false" :activator="selectedElement" offset-x>
          <v-card min-width="300px" flat>
            <v-toolbar :color="selectedEvent.color" dark dense>
              {{ selectedEvent.name }}
            </v-toolbar>
            <v-card-text class="text-center">
              <v-row v-for="(item, i) in dictionary" :key="i">
                <v-col cols="6">
                  <h4 v-text="item.value"></h4>
                </v-col>
                <v-col cols="6">
                  {{ selectedEvent[item.key] }}
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="selectedOpen = false"> Cerrar </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
const props = {
  events: {
    default: [],
    type: Array,
  },
  dictionary: {
    default: [],
    type: Array,
  },
};

export default {
  name: "calendar",
  data: () => ({
    focus: "",
    type: "month",
    typeToLabel: {
      month: "Mes",
      week: "Semana",
      day: "Día",
      "4day": "4 días",
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
  }),
  mounted() {
    this.$refs.calendar.checkChange();
  },
  methods: {
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        requestAnimationFrame(() => requestAnimationFrame(() => (this.selectedOpen = true)));
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        requestAnimationFrame(() => requestAnimationFrame(() => open()));
      } else {
        open();
      }
      nativeEvent.stopPropagation();
    },
    upperString(str){
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
  },
  props: props,
};
</script>

<style scoped></style>
