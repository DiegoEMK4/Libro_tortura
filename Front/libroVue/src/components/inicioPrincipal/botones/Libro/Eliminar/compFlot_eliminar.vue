<template>
  <div class="pa-4">
    <v-dialog v-model="dialog" max-width="200">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn icon
          @click="eliminarLibro"
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
    async eliminarLibro() {
      console.log('ID del libro a eliminar:', this.id);
      if (confirm('¿Estás seguro de que deseas eliminar este registro?')) {
        try {
          console.log("-/", this.id);
          const res = await axios.put(`http://localhost:5654/api/libro/eliminarLibroLogico/${this.id}`);
          console.log('Respuesta del registro:', res);
          this.$emit('eliminacion_exitosa'); 
        } catch (error) {
          console.error('Error al eliminar el libro:', error);
        }
      }
    }
  }
};
</script>
