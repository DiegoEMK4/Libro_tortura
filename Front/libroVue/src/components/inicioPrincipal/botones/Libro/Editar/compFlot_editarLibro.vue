<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="600">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn icon
          @click="abrirDialogo"
          color="#5E7066"
          v-bind="activatorProps"
        ><v-icon>mdi-account</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="justify-center" style="background-color: #5E7066; color: white;">
          <v-icon left>mdi-book-open-variant</v-icon>
          Editar Registro
        </v-card-title>

        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="6">
              <v-text-field 
                label="Expediente"
                v-model="libroLocal.expediente"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                label="Fecha de solicitud"
                type="date"
                v-model="libroLocal.fecha_solicitud"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                label="Fecha de emisión"
                type="date"
                v-model="libroLocal.fecha_emision"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field 
                label="NIC"
                v-model="libroLocal.nic"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field 
                label="NUC"
                v-model="libroLocal.nuc"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-select
                :items="['Dictamen', 'Informe']"
                label="Documento"
                v-model="libroLocal.documento_emitido"
                required
              ></v-select>
            </v-col>

            <v-col cols="12" md="6">
              <v-select
                :items="['Identificación']"
                label="Materia pericial"
                v-model="libroLocal.materia_pericial"
                required
              ></v-select>
            </v-col>

            <v-col cols="12" md="6">
              <v-select
                :items="['ATLACOMULCO','CUAUTITLAN','ECATEPEC','IXTLAHUACA','LERMA','METEPEC','TEJUPILCO','TEMASCALTEPEC','TEMOAYA','TENANCINGO','TENANGO DEL VALLE','TEXCOCO','TIANGUISTENGO','TLALNEPANTLA','TOLUCA','XONACATLAN','ZINACANTEPEC']"
                label="Agencia"
                v-model="libroLocal.agencia"
                required
              ></v-select>
            </v-col>

            <v-col cols="12">
              <v-divider class="my-4"></v-divider>
            </v-col>

            <v-col cols="12" class="pb-2">
              <strong>Datos del Perito</strong>
            </v-col>

            <v-col cols="12" md="10">
              <v-text-field
                label="Nombre"
                v-model="libroLocal.nombre_perito"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="justify-end">
          <v-btn @click="dialog = false">Cerrar</v-btn>
          <v-btn color="#5E7066" @click="editarLibro">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  props: {
    libro: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dialog: false,
      libroLocal: {} //
    };
  },
  watch: {
    libro: {
      immediate: true,
      handler(nuevoLibro) {
        //
        this.libroLocal = {
          ...nuevoLibro,
          fecha_solicitud: this.formatearFecha(nuevoLibro.fecha_solicitud),
          fecha_emision: this.formatearFecha(nuevoLibro.fecha_emision)
        };
      }
    }
  },
  methods: {
    abrirDialogo() {
      this.dialog = true;
    },
    formatearFecha(fecha) {
      if (!fecha) return '';
      //
      const date = new Date(fecha);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    async editarLibro() {
      console.log("----/----")
      console.log()

      try {
        const res = await axios.put(`http://localhost:5654/api/libro/editarLibro/${this.libroLocal.id}`,
          {
            expediente: this.libroLocal.expediente,
            fecha_solicitud: this.libroLocal.fecha_solicitud,
            fecha_emision: this.libroLocal.fecha_emision,
            nombre_perito:this.libroLocal.nombre_perito,
            nic: this.libroLocal.nic,
            nuc: this.libroLocal.nuc,
            documento_emitido: this.libroLocal.documento_emitido,
            materia_pericial: this.libroLocal.materia_pericial,
            agencia: this.libroLocal.agencia,
          })
        console.log('Editar Libro:', res.data);
        this.$emit('editarLibro_exitoso');
        this.dialog = false;
      } catch (error) {
        console.error('Error al registrar libro:', error);
      }
    }
  }
};
</script>

<style scoped>
.pa-4 {
  padding: 16px;
}
</style>