<template>
  <div class="pa-4 text-center">
    <v-dialog
      v-model="dialog"
      max-width="600"
    >
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          color="#5E7066"
          text
          v-bind="activatorProps"
        >
          <v-icon class="mr-2">mdi-account</v-icon> Agregar Usuario
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="justify-center" style="background-color: #5E7066; color: white;">
          <v-icon left>mdi-account</v-icon>
          Datos del nuevo Usuario
        </v-card-title>

        <v-card-text>
          <!-- Primera fila -->
          <v-row dense>
            <v-col cols="12" md="6">
              <v-text-field
                label="Nombre"
                required
                v-model="usuario.nombre"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                label="Primer apellido"
                required
                v-model="usuario.apellido_P"
              ></v-text-field>
            </v-col>
          </v-row>

          <!-- Segunda fila -->
          <v-row dense>
            <v-col cols="12" md="6">
              <v-text-field
                label="Segundo apellido"
                required
                v-model="usuario.apellido_M"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                label="Nombre de usuario"
                required
                v-model="usuario.nombre_usuario"
              ></v-text-field>
            </v-col>
          </v-row>

          <!-- Tercera fila -->
          <v-row dense>
            <v-col cols="12" md="6">
              <v-text-field
                label="Contraseña"
                type="password"
                required
                v-model="usuario.contrasena"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                label="Confirma la nueva contraseña"
                type="password"
                required
                v-model="usuario.contrasenaC"
              ></v-text-field>
            </v-col>
          </v-row>

          <!-- Cuarta fila -->
          <v-row dense>
            <v-col cols="12" md="6">
              <v-select
                :items="['Capturador', 'Consulta', 'Admin']"
                item-value="rol_id"
                item-text="rol_id"
                label="Rol de usuario"
                required
                v-model="usuario.rol_id"
              ></v-select>
            </v-col>

            <v-col cols="12" md="6">
              <v-select
                :items="['Activo', 'Inactivo']"
                item-value="estado_usuario"
                item-text="estado_usuario"
                label="Estado de usuario"
                v-model="usuario.estado_usuario"
              ></v-select>
            </v-col>
          </v-row>
        </v-card-text>

        <div v-if="mensajeError" class="mensaje-error">
          {{ mensajeError }}
        </div>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text variant="plain" @click="dialog = false">Cerrar</v-btn>
          <v-btn color="#5E7066" variant="tonal" @click="registrarUsuario">Guardar</v-btn>
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
      mensajeError: '',
      usuario: {
        nombre: '',
        apellido_P: '',
        apellido_M: '',
        nombre_usuario: '',
        contrasena: '',
        contrasenaC: '',
        rol_id: '',
        estado_usuario: ''
      }
    };
  },
  methods: {
    async registrarUsuario() {
      const storedData = JSON.parse(localStorage.getItem('usuario'));
      const token = storedData?.token || null;

      if (!token) {
        console.error('El token no fue encontrado');
        return;
      }
      try {
        if (this.usuario.contrasena === this.usuario.contrasenaC) {
          const res = await axios.post(
            'http://localhost:5654/api/usuario/crearUsuario',
            {
              nombre: this.usuario.nombre,
              apellido_P: this.usuario.apellido_P,
              apellido_M: this.usuario.apellido_M,
              nombre_usuario: this.usuario.nombre_usuario,
              contrasena: this.usuario.contrasena,
              rol_id: this.usuario.rol_id,
              estado_usuario: this.usuario.estado_usuario
            },
            {
              headers: {
                'x-token': token
              }
            }
          );
          console.log('Respuesta del registro:', res.data);
          this.dialog = false;
          this.$emit('registrarUsuario_exitoso');
          this.mensajeError = '';
        } else {
          console.log("Las contraseñas no coinciden");
        }
      } catch (error) {
        console.error('Error al registrar usuario:', error);
        this.mensajeError = error.response?.data.message || 'Error en el servidor. Por favor, intenta de nuevo.';
        setTimeout(() => {
          this.mensajeError = '';
        }, 10000);
      }
    }
  }
};
</script>
