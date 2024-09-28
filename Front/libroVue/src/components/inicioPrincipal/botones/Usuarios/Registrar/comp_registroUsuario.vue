<template>
  <v-app>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card>
            <v-card-title>
              <span class="headline">Registrar Nuevo Usuario</span>
            </v-card-title>
            <v-card-text>
              <v-form ref="form" v-model="valid">
                <v-row>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="record.nombres"
                      :rules="requiredRules"
                      label="Nombre"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="record.apellidoPaterno"
                      :rules="requiredRules"
                      label="Apellido Paterno"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="record.apellidoMaterno"
                      :rules="requiredRules"
                      label="Apellido Materno"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="record.nombreUsuario"
                      :rules="requiredRules"
                      label="Nombre de usuario"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="record.contrasena"
                      :rules="requiredRules"
                      label="Contraseña"
                      required
                      type="password"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="record.rolUsuario"
                      :rules="requiredRules"
                      :items="rolUsuarioItems"
                      label="Rol de usuario"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="record.estadoUsuario"
                      :rules="requiredRules"
                      :items="estadoUsuarioItems"
                      label="Estado de usuario"
                      required
                    ></v-select>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="registrarUsuario">Registrar</v-btn>
              <v-btn color="secondary" @click="reset">Limpiar</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      valid: false,
      record: {
        nombres: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        nombreUsuario: '',
        contrasena: '',
        rolUsuario: '',
        estadoUsuario: ''
      },
      requiredRules: [v => !!v || 'El campo es obligatorio'],
      rolUsuarioItems: ['Capturador', 'Consultas'],
      estadoUsuarioItems: ['Activo', 'No Activo']
    };
  },
  methods: {
    async registrarUsuario() {
      const storedData = JSON.parse(localStorage.getItem('usuario'));
      const token = storedData && storedData.token ? storedData.token : null;
      console.log("El token es:", token);
      if (!token) {
        console.error('El token no fue encontrado');
        return;
      }
      try {
        const response = await axios.post('http://localhost:5654/api/usuario/crearUsuario', {
          nombre: this.record.nombres,
          apellido_P: this.record.apellidoPaterno,
          apellido_M: this.record.apellidoMaterno,
          nombre_usuario: this.record.nombreUsuario,
          contrasena: this.record.contrasena,
          rol_id: this.record.rolUsuario,
          estado_usuario: this.record.estadoUsuario
        }, {
          headers: {
            'x-token': token 
          }
        });
        console.log('Respuesta del registro:', response.data);
        this.reset();
      } catch (error) {
        console.error('Error al registrar usuario:', error);
      }
    },
    reset() {
      this.$refs.form.reset();
      this.record = {
        nombres: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        nombreUsuario: '',
        contrasena: '',
        rolUsuario: '',
        estadoUsuario: ''
      };
    }
  }
};
</script>

<style scoped>
.headline {
  font-size: 24px;
  font-weight: 500;
}
</style>
