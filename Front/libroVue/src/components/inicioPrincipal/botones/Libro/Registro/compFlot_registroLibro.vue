<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="600">
      <template v-slot:activator="{ props }">
        <v-btn color="#5E7066" text v-bind="props">
          <v-icon class="mr-2">mdi-pencil</v-icon> Agregar Registro

        </v-btn>
      </template>

      <v-card>
        <v-card-title class="justify-center" style="background-color: #5E7066; color: white;">
          <v-icon left>mdi-book-open-variant</v-icon>
          Agregar Registro
        </v-card-title>

        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="6">
              <v-text-field 
                label="Expediente"
                v-model="libro.expediente"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                label="Fecha de solicitud"
                type="date"
                v-model="libro.fecha_solicitud"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                label="Fecha de emisión"
                type="date"
                v-model="libro.fecha_emision"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field 
                label="NIC"
                v-model="libro.nic"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field 
                label="NUC"
                v-model="libro.nuc"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-select
                :items="documentos_emitidos"
                label="Documento"
                v-model="libro.documento_emitido"
                required
              ></v-select>
            </v-col>

            <v-col cols="12" md="6">
              <v-select
                :items="materia_periciales"
                label="Materia pericial"
                v-model="libro.materia_pericial"
                required
              ></v-select>
            </v-col>

            <v-col cols="12" md="6">
              <v-select
                :items="agencias"
                label="Agencia"
                v-model="libro.agencia"
                required
              ></v-select>
            </v-col>

            <v-col cols="12">
              <v-divider class="my-4"></v-divider>
            </v-col>

            <v-col cols="12" class="pb-2">
              <strong>Datos del Perito</strong>
            </v-col>

            <v-col cols="12" md="4">
              <v-select
                label="Nombre Perito"
                :items="nombres_perito"
                v-model="libro.nombre_perito"
                required
                ></v-select>
            </v-col>


          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="justify-end">
          <v-btn text @click="dialog = false">Cerrar</v-btn>
          <v-btn color="#5E7066" @click="registrarLibro">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      dialog: false,
      libro: {
        expediente: '',
        fecha_solicitud: '',
        fecha_emision: '',
        nombre_perito: '',
        primer_apellido: '',
        segundo_apellido: '',
        nic: '',
        nuc: '',
        documento_emitido: '',
        materia_pericial: '',
        agencia: '',
      },
      documentos_emitidos: ['Dictamen','Informe'],
      materia_periciales: ['Identificación'],
      agencias: ['ATLACOMULCO','CUAUTITLAN','ECATEPEC','IXTLAHUACA','LERMA','METEPEC','TEJUPILCO','TEMASCALTEPEC','TEMOAYA','TENANCINGO','TENANGO DEL VALLE','TEXCOCO','TIANGUISTENGO','TLALNEPANTLA','TOLUCA','XONACATLAN','ZINACANTEPEC'],
      nombres_perito: [],
    };
  },
  mounted() {
    this.obtenerNombresPeritos(); 
  },
  
  methods: {
    async obtenerNombresPeritos() {
      try {
        const response = await axios.get('http://localhost:5654/api/libro/buscarPerito'); 
        console.log('Respuesta de la API:', response.data); 

       
        if (Array.isArray(response.data)) {
          
          this.nombres_perito = response.data.map(perito => perito.nombre_perito); 
        } else {
          console.error('La respuesta de la API no es un arreglo:', response.data);
        }
      } catch (error) {
        console.error('Error al obtener nombres de peritos:', error);
      }
    },

    async registrarLibro() {
      try {
        const res = await axios.post('http://localhost:5654/api/libro/crearLibro',
          {
            expediente: this.libro.expediente,
            fecha_solicitud: this.libro.fecha_solicitud,
            fecha_emision: this.libro.fecha_emision,
            nic: this.libro.nic,
            nuc: this.libro.nuc,
            documento_emitido: this.libro.documento_emitido,
            materia_pericial: this.libro.materia_pericial,
            agencia: this.libro.agencia,
            nombre_perito:this.libro.nombre_perito
          })
        console.log('Respuesta del registro:', res.data);
        this.$emit('registroLibro_exitoso');

        this.dialog = false;
      } catch (error) {
        console.error('Error al registrar libro:', error);
      }
    },
  }
};
</script>

<style scoped>
.pa-4 {
  padding: 16px;
}
</style>