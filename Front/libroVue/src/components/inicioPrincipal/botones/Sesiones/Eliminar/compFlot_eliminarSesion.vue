<template>
    <div class="pa-4 text-center">
      <v-dialog v-model="dialog" max-width="600">
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn icon
            @click="eliminarSesion"
            color="#5E7066"
            v-bind="activatorProps"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-dialog>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: {
      id: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        dialog: false
      };
    },
    methods: {
      async eliminarSesion() {
        console.log('ID del registro a eliminar:', this.id);
        if (confirm('¿Estás seguro de que deseas eliminar este registro?')) {
          try {
            console.log("-/----", this.id);
            const res = await axios.delete(`http://localhost:5654/api/sesion/eliminar_registro_sesion/${this.id}`);
            console.log('Respuesta del registro:');
            this.$emit('eliminacion_exitosa_sesiones'); 
          } catch (error) {
            console.error('Error al eliminar el libro:', error);
          }
        }
      }
    }
  };
  </script>
  