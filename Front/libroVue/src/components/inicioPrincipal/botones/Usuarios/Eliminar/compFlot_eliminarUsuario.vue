<template>
    <div class="pa-4 text-center">
      <v-dialog
        v-model="dialog"
        max-width="600"
      >
        <template v-slot:activator="{props: activatorProps }">
          <v-btn icon
            @click="eliminarUsuario"
            color="#5E7066"
            v-bind="activatorProps"
        ><v-icon>mdi-delete</v-icon></v-btn>
      </template>
      
      </v-dialog>
   </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    id: {
      type:Number,
      required: true
    }
  },
  methods: {
  async eliminarUsuario() {
    console.log('ID del usuario a eliminar:', this.id); 
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?'))
    try {
      console.log("-/-", this.id);

      const res = await axios.delete(`http://localhost:5654/api/usuario/eliminarUsuario/${this.id}`);
      console.log('Respuesta del registro:', res);
      this.$emit('eliminarUsuario_exitoso'); 
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  }
}
};
</script>

<style >

</style>