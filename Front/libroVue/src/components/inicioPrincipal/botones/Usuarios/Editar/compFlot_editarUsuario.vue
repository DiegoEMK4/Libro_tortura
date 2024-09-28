<template>
  <div class="pa-4">
    <v-dialog v-model="dialog" max-width="600">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn icon @click="abrirDialogo" color="#5E7066" v-bind="activatorProps">
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="justify-center" style="background-color: #5E7066; color: white;">
          <v-icon left>mdi-account</v-icon>
          Editar Registro de Usuario
        </v-card-title>

        <v-card-text>
          <v-form>
            <v-row dense>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Nombre"
                  v-model="usuarioLocal.nombre"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  label="Primer apellido"
                  v-model="usuarioLocal.apellido_P"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  label="Segundo apellido"
                  v-model="usuarioLocal.apellido_M"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  label="Nombre de usuario"
                  v-model="nombre_usuario"
                  required
                ></v-text-field>
              </v-col>


              <v-col cols="12" md="6">
                <v-select
                  :items="['Capturador','Consulta','Admin']"
                  label="Rol de usuario"
                  v-model="usuarioLocal.rol_id"
                  required
                  item-value="value"
                  item-text="text"
                ></v-select>
              </v-col>

              <v-col cols="12" md="6">
                <v-select
                  :items="['Activo','Inactivo']"
                  label="Estado de usuario"
                  v-model="usuarioLocal.estado_usuario"
                ></v-select>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        
        <div v-if="mensajeError" class="mensaje-error">
          {{ mensajeError }}
        </div>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="cerrarDialogo">
            Cerrar
          </v-btn>
          <v-btn color="#5E7066" @click="actualizarUsuario">
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
  props: {
    usuario: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dialog: false,
      mensajeError: '',
      usuarioLocal: {},
      roles: [], 
      estados: [] 
    };
  },
  watch: {
    usuario: {
      immediate: true,
      handler(nuevoUsuario) {
        this.usuarioLocal = { ...nuevoUsuario };
      }
    }
  },
  methods: {
    abrirDialogo() {
      this.dialog = true;
    },
    cerrarDialogo() {
      this.dialog = false;
    },
    async actualizarUsuario() {
      console.log("Ingreso a actualizar",this.usuarioLocal.id)
      try {
        const res = await axios.put(`http://localhost:5654/api/usuario/editarUsuario/${this.usuarioLocal.id}`,
          {
            nombre: this.usuarioLocal.nombre,
            apellido_P: this.usuarioLocal.apellido_P,
            apellido_M: this.usuarioLocal.apellido_M,
            nombre_usuario: this.nombre_usuario,
            rol_id: this.usuarioLocal.rol_id,
            estado_usuario: this.usuarioLocal.estado_usuario
          })
        console.log('Editar Usuario:', res.data);
        this.dialog = false;
        this.$emit('editarUsuario_exitoso');
        this.mensajeError = '';
      } catch (error) {
        console.error('Error al editar usuario:', error);
        this.mensajeError = error.response?.data.message || 'Error en el servidor. Por favor, intenta de nuevo.';
        setTimeout(() => {
          this.mensajeError = '';
        }, 10000);
      }
    },
    async cargarRoles() {  
    },
    async cargarEstados() {  
    }
  },
  created() {
    this.cargarRoles();
    this.cargarEstados();
  }
};
</script>

<style scoped>
.pa-4 {
  padding: 16px;
}

.v-form {
  margin-bottom: 16px;
}

.v-card-actions {
  padding: 16px;
}

.mensaje-error {
  background-color: #f8d7da;
  color: #721c24;
  padding: 15px;
  border: 1px solid #f5c6cb;
  border-radius: 5px;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.mensaje-error::after {
  content: '';
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}
</style>