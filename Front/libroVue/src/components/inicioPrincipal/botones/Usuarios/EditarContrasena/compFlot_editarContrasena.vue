<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="600">
      <template v-slot:activator="{ props: activatorProps }">

        <v-btn icon color="#5E7066" v-bind="activatorProps">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="justify-center" style="background-color: #5E7066; color: white;">
          <v-icon left>mdi-book-open-variant</v-icon>
          Editar Registro
        </v-card-title>
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="10" sm="6">
              <v-text-field
                v-model="usuario.contrasena"
                label="Ingrese la nueva contraseña"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="10" sm="6">
              <v-text-field
                v-model="usuario.contrasenaC"
                label="Confirma la nueva contraseña"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text variant="plain" @click="dialog = false">
            Cerrar
          </v-btn>

          <v-btn color="#5E7066" variant="tonal" @click="editarContrasena">
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data: () => ({
    dialog: false,
    usuario: {
      contrasena: '',
      contrasenaC: '',
    },
  }),

  props: {
    id: {
      type: Number,
      required: true,
    },
  },

  methods: {

    async editarContrasena() {
      if (confirm('¿Estás seguro de cambiar la contraseña de este usuario?')) {
        try {
          if(this.usuario.contrasena == this.usuario.contrasenaC){
              console.log("ID:", this.id);
              console.log("Nueva contraseña:", this.usuario.contrasena);
              const res = await axios.put(`http://localhost:5654/api/usuario/ocultarContrasena/${this.id}`, {
              contrasena: this.usuario.contrasena
              });
              console.log('Respuesta de la actualización:', res);
              this.dialog = false;
            }else{
             console.log("Las contraseñas con coinciden")
            }
        
          } catch (error) {
          console.error('Error al cambiar la contraseña:', error);
          }
        }
      
    },
  },
};
</script>
