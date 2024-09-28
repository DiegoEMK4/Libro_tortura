<template>
    <div class="pa-4">
      <v-card>
        <v-card-title>
          <span class="pa-4 text-center">Lista de Sesiones en el sistema</span>
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="search"
            label="Buscar"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            hide-details
            single-line
            class="mb-4"
          ></v-text-field>
  
          <v-data-table
            :headers="headers"
            :items="sesiones"
            :items-per-page="5"
            class="elevation-1"
            :search="search"
          >
            <template v-slot:item.acciones="{ item }">
              <v-row dense>
                <v-col cols="auto">
                  <comp_eliminar :id="item.id" @eliminacion_exitosa_sesiones="obtenerSesiones" />
                </v-col>
              </v-row>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import comp_eliminar from '../Usuarios/Eliminar/compFlot_eliminarUsuario.vue';
  
  export default {
    components: {
      comp_eliminar,
    },
    data() {
      return {
        search: '',
        sesiones: [],
        headers: [
          { text: 'ID', value: 'id', align: 'center' },
          { text: 'Nombre', value: 'nombre', align: 'center' },
          { text: 'Primer Apellido', value: 'apellido_P', align: 'center' },
          { text: 'Segundo Apellido', value: 'apellido_M', align: 'center' },
          { text: 'Nombre de Usuario', value: 'nombre_usuario', align: 'center' },
          { text: 'Fecha de Ingreso', value: 'createdAt', align: 'center' },
          { text: 'Fecha de Salida', value: 'updatedAt', align: 'center' },
          { text: 'Acciones', value: 'acciones', align: 'center', sortable: false }
        ]
      };
    },
    created() {
      this.obtenerSesiones();
    },
    methods: {
      async obtenerSesiones() {
        try {
          const response = await axios.get('http://localhost:5654/api/sesion/buscar_registros_sesion');
          this.sesiones = response.data;
        } catch (error) {
          console.error('Error al obtener sesiones:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  </style>
  