<template>
  <v-container fluid class="text-center">
    <Loader :loading="loading" />
    <Table-Container title="Orden de compra">
      <template v-slot:buttons>
        <Basic-Btn text="Agregar" color="primary" icon="mdi-plus" @click="dialogs.new = true" :loading="loading" />
        <Basic-Btn text="Actualizar" color="success" icon="mdi-refresh" @click="refreshResident()" :loading="loading" />
      </template>
      <template v-slot:search>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" class="mx-2" single-line hide-details maxlength="150"></v-text-field>
      </template>
      <v-data-table v-model="selected" :headers="headers" :items="items" :loading="loading" :search="search" :footer-props="{ 'items-per-page-text': 'Elementos por página', 'items-per-page-options': [20, 50, -1] }" :items-per-page="10" item-key="id" class="elevation-1" dense>
        <v-progress-linear slot="progress" color="secondary" indeterminate></v-progress-linear>
        <template v-slot:[`item.price`]="{ item }">
         ${{item.price}}
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-tooltip left
            ><template v-slot:activator="{ on, attrs }"><v-icon class="mr-2" size="22" color="primary" dark v-bind="attrs" v-on="on" :disabled="loading" @click="dialogs.alert = true">mdi-cash-register</v-icon></template
            ><span>Pagar</span></v-tooltip
          >
        </template>
        <template v-slot:[`footer.page-text`]="props"> Página {{ props.pageStart }} - {{ props.pageStop }} de {{ props.itemsLength }} </template>
        <template v-slot:no-data> No hay información disponible </template>
        <template v-slot:no-results> No se obtuvieron resultados </template>
      </v-data-table>
    </Table-Container>

    <Dialog-Form :estate="dialogs.new" title="Nuevo producto">
      <template v-slot:buttons>
        <Basic-Btn text="Cancelar" color="error" icon="mdi-close" @click="cancel()" :loading="loading" />
        <Basic-Btn text="Guardar" color="success" icon="mdi-check" @click="save()" :loading="loading" />
      </template>
      <v-form ref="formNew" lazy-validation>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="forms.new.sku" label="SKU" prepend-icon="mdi-package-variant-closed" :rules="rules.required" :disabled="loading" dense outlined required></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="forms.new.name" label="Nombre" prepend-icon="mdi-cart" :rules="rules.required" :disabled="loading" dense outlined required></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="forms.new.quantity" label="Cantidad" prepend-icon="mdi-numeric" :rules="rules.required" :disabled="loading" type="number" dense outlined required></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="forms.new.price" label="Precio" prepend-icon="mdi-cash" :rules="rules.required" :disabled="loading" type="number" step="0.01" dense outlined required></v-text-field>
          </v-col>
        </v-row>
      </v-form>
    </Dialog-Form>
    <Alerts-Message :estate="dialogs.alert">
      <template v-slot:close>
        <Basic-Btn text="Cancelar" color="disabled" @click="dialogs.alert = false" block :loading="loading" dark/>
      </template>
    </Alerts-Message>
    <BasicAlert :active.sync="alert.active" :msg="alert.msg" :color="alert.color" />
  </v-container>
</template>

<script>
import services from "@/utils/services";
import { Loader, DialogForm, BasicAlert, TableContainer, BasicBtn, AlertsMessage } from "@/components";

export default {
  name: "report",
  components: {
    Loader,
    DialogForm,
    BasicAlert,
    TableContainer,
    BasicBtn,
    AlertsMessage,
  },
  data: () => ({
    search: '',
    loading: false,
    selected: [],
    headers: [
      {
        text: "Orden",
        align: "center",
        sortable: false,
        value: "number",
      },
      { text: "SKU", align: "center", value: "sku" },
      { text: "Nombre", align: "center", value: "name" },
      { text: "Cantidad", align: "center", value: "quantity" },
      { text: "Precio", align: "center", value: "price" },
      { text: "Acciones", align: "center", value: "actions" },
    ],
    forms: {
      new: {
        number: 'Pendiente',
        sku: "",
        name: "",
        quantity: 0,
        price: 0.00,
      },
    },
    alert: {
      active: false,
      color: "error",
      msg: "",
    },
    rules: {
      required: [(v) => !!v || "El campo es requerido"],
    },
    items: [],
    dialogs: {
      new: false,
      alert: false,
    },
  }),
  mounted(){
    this.refreshResident()
  },
  methods: {
    async refreshResident() {
      this.loading = true;
      this.axios
        .get(services.routes.orders)
        .then((response) => {
          this.items = [];
          for (let data of response.data.orders) {
        this.items.push({
          number: data.number? data.number : "",
          sku: data.items[0].sku ? data.items[0].sku : "",
          name: data.items[0].name ? data.items[0].name : "",
          quantity: data.items[0].quantity ? data.items[0].quantity : "",
          price: data.items[0].price ? data.items[0].price  : "0.00",
        });
      }
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
            this.$session.destroy();
            this.$router.push("/login");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    cancel() {
      if (this.dialogs.new) {
        this.$refs.formNew.reset();
        for (let key in this.forms.new) {
          this.forms.new[key] = "";
        }
        this.dialogs.new = false;
      }
    },
    save() {
        this.loading = true;
        let data = JSON.parse(JSON.stringify(this.forms.new));
      if (this.$refs.formNew.validate()) {
        this.items.push(data)
        
      } else {
        this.alert.active = true;
        this.alert.color = "error";
        this.alert.msg = "La información es incorrecta";
      }
      this.loading = false;

    },
  },
};
</script>

<style scoped></style>
