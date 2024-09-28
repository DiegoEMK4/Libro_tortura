<template>
  <v-container>
    <v-form ref="form">
      <v-row class="mb-4">
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="fecha_i"
            label="Fecha de Inicio"
            type="date"
            outlined
            dense
            prepend-inner-icon="mdi-calendar"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="fecha_f"
            label="Fecha de Fin"
            type="date"
            outlined
            dense
            prepend-inner-icon="mdi-calendar"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mb-4">
        <v-col cols="12" sm="6">
          <v-btn
            color="#5E7066"
            class="mr-4"
            @click="fetchRecords"
            :loading="loading"
            block
            large
          >
            Listo
          </v-btn>
        </v-col>
        <v-col cols="12" sm="6">
          <v-btn
            :class="`cursor-${cursor}`"
            color="#5E7066"
            @click="descargarExcel"
            :disabled="!records.length"
            block
            large
          >
            Descargar
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
    <v-data-table
      :headers="headers"
      :items="records"
      :items-per-page="5"
      class="elevation-1"
      :search="search"
    >
   
    </v-data-table>
  </v-container>
</template>

<script>
import axios from "axios";
import ExcelJS from "exceljs";

export default {
  data: () => ({
      cursors: [
        'auto'],
      }),
  data() {

    return {
      fecha_i: "",
      fecha_f: "",
      records: [],
      loading: false,
      headers: [
        { text: "ID", align: "center", value: "id" },
        { text: "No. Expediente", align: "center", value: "expediente" },
        { text: "Fecha de solicitud", align: "center", value: "fecha_solicitud" },
        { text: "Fecha de emisión", align: "center", value: "fecha_emision" },
        { text: "Nombre del perito", align: "center", value: "nombre_perito" },
        { text: "NIC", align: "center", value: "nic" },
        { text: "NUC", align: "center", value: "nuc" },
        { text: "Carpeta de investigación", align: "center", value: "carpeta_investigacion" },
        { text: "Documento emitido", align: "center", value: "documento_emitido" },
        { text: "Materia Pericial", align: "center", value: "materia_pericial" },
        { text: "Agencia", align: "center", value: "agencia" },
        { text: "Opciones", align: "center", value: "acciones", sortable: false },
      ],
    };
  },
  methods: {
    async fetchRecords() {
      this.loading = true;
      try {
        const response = await axios.get(
          "http://localhost:5654/api/libro/buscarLibros-excel",
          {
            params: {
              fecha_i: this.fecha_i,
              fecha_f: this.fecha_f,
            },
          }
        );
        this.records = response.data;
      } catch (error) {
        console.error("Error al obtener registros:", error);
      } finally {
        this.loading = false;
      }
    },
    async descargarExcel() {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Registros de Dactiloscopia");
      worksheet.columns = [
        { header: "ID", key: "id", width: 10 },
        { header: "No. Expediente", key: "expediente", width: 20 },
        { header: "Fecha de solicitud", key: "fecha_solicitud", width: 20 },
        { header: "Fecha de emisión", key: "fecha_emision", width: 20 },
        { header: "Nombre del perito", key: "nombre_perito", width: 30 },
        { header: "NIC", key: "nic", width: 15 },
        { header: "NUC", key: "nuc", width: 15 },
        {
          header: "Carpeta de investigación",
          key: "carpeta_investigacion",
          width: 30,
        },
        { header: "Documento emitido", key: "documento_emitido", width: 30 },
        { header: "Materia Pericial", key: "materia_pericial", width: 20 },
        { header: "Agencia", key: "agencia", width: 20 },
      ];
      this.records.forEach((record) => {
        worksheet.addRow(record);
      });
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "Registros.xlsx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  },
};
</script>
