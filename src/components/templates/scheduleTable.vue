<template>
  <v-simple-table fixed-header v-if="scheduleData.length > 0">
    <thead>
      <tr>
        <th class="text-left">Día</th>
        <th class="text-left">Hora de inicio</th>
        <th class="text-left">Hora fin</th>
        <th class="text-left">Inicio de comida</th>
        <th class="text-left">Fin de comida</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="day in scheduleData" :key="day.dia">
        <td>{{ weekDays[day.dia - 1] }}</td>
        <td>{{ day.hora_inicio.slice(0, 5) }}</td>
        <td>{{ day.hora_fin.slice(0, 5) }}</td>
        <td>{{ day.hora_comida_inicio.slice(0, 5) }}</td>
        <td>{{ day.hora_comida_fin.slice(0, 5) }}</td>
      </tr>
    </tbody>
  </v-simple-table>
</template>
<script>
const props = {
  scheduleData: {
    default: [],
    type: Array,
  },
};

export default {
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
  data() {
    return {
      weekDays: ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"],
    };
  },
  props: props,
};
</script>
<style scoped></style>
