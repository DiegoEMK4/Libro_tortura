<template>
  <v-container class="fill-height" fluid>
    <mensaje />
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" class="mt-0">
        <v-card class="elevation-12">
          <v-toolbar color="#4D6156" dark flat>
            <v-toolbar-title class="text-center">
               
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="nombre_usuario"
                label="nombre_usuario"
                prepend-icon="mdi-account"
                type="text"
                required
              ></v-text-field>
              <v-text-field
               v-model="contrasena"
                label="contrasena"
                name="contrasena"
                prepend-icon="mdi-lock"
                type="password"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="login">Ingresar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <mensaje2/>
  </v-container>
</template>

<script>
import axios from 'axios';
import mensaje from '../../components/login/mensaje.vue';
import Mensaje2 from '../../components/login/mensaje2.vue';

export default {
  components: {
    mensaje,
    Mensaje2
  },
  data() {
    return {
      nombre_usuario: '',
      contrasena: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:5654/api/auth/login', {
          nombre_usuario: this.nombre_usuario,
          contrasena: this.contrasena
        });
        console.log('Respuesta del Login:', response.data);

        if (response.data.token) {
          //console.log('Token recibido:', response.data.token);
          //console.log('Usuario recibido:', response.data.usuario);
          //revisa vuex y resisar local storage
          localStorage.setItem('usuario', JSON.stringify(response.data));
          //localStorage.setItem('usuario',response.data);
          this.$router.push('/inicio'); 
        } else {
          alert('Error al iniciar sesión. Por favor, verifica tus datos.');
        }
      } catch (error) {
        alert('Error al iniciar sesión. Por favor, intenta de nuevo.');
      }
    },
  },
};
</script>

<style scoped>
.fill-height {
  height: 100vh;
}
</style>
