<template>
  <v-navigation-drawer
    app
    :width="279"
    v-model="drawer"
    color="#5E7066"
  >
    <v-list-item class="py-4 px-3">
      <v-list-item-avatar>
        <v-icon size="40" color="white">mdi-account</v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="white--text">{{ nombre_usuario }}</v-list-item-title>
        <v-list-item-subtitle class="white--text">Libro Dactiloscopia</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>
    <v-list dense nav>
     
      <template v-if="rol === 0">
        <v-list-item :to="{ name: 'libro-crud' }">
          <v-list-item-icon>
            <v-icon>mdi-book-open-page-variant</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Agregar Registrar</v-list-item-title>
        </v-list-item>

        <v-list-item :to="{ name: 'registroUsuario' }">
          <v-list-item-icon>
            <v-icon>mdi-account-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Registrar Usuario</v-list-item-title>
        </v-list-item>

        <v-list-item :to="{ name: 'generar-excel' }">
          <v-list-item-icon>
            <v-icon>mdi-file-excel</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Generar Excel</v-list-item-title>
        </v-list-item>
      </template>

      <template v-if="rol === 1|| rol === 2">
        <v-list-item :to="{ name: 'libro-crud' }">
          <v-list-item-icon>
            <v-icon>mdi-book-open-page-variant</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Agregar Registrar</v-list-item-title>
        </v-list-item>

        <v-list-item :to="{ name: 'generar-excel' }">
          <v-list-item-icon>
            <v-icon>mdi-file-excel</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Generar Excel</v-list-item-title>
        </v-list-item>
      </template>

    </v-list>
  </v-navigation-drawer>

  <v-app-bar app color="#4D6156" dark>
    <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
    <v-toolbar-title>Libro Dactiloscopia</v-toolbar-title>

    <v-btn
      icon
      color="white"
      @click="cerrarSesion"
      :style="{ marginRight: '50px' }"
    >
      <span style="margin-right: 8px;">Salir</span>
      <v-icon>mdi-export</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import axios from 'axios';

export default {
  computed: {
    nombre_usuario() {
      const storedData = JSON.parse(localStorage.getItem('usuario'));
      return storedData && storedData.usuario.nombre_usuario
    },
    rol() {
      const storedData = JSON.parse(localStorage.getItem('usuario'));
      console.log("Este es el rol del usuario",storedData.usuario.rol_id);
      return storedData && storedData.usuario.rol_id 
    }
  },
  data() {
    return {
      drawer: false,
    };
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    async cerrarSesion() {
      try {
        const storedData = JSON.parse(localStorage.getItem('usuario'));

        if (storedData) {
          const { nombre_usuario, id } = storedData;

          await axios.post('http://localhost:5654/api/auth/logout', {
            nombre_usuario,
            id
          });

          localStorage.clear();
          window.location.href = '/login';
        } else {
          console.error('Datos de usuario no encontrados en localStorage');
        }
      } catch (error) {
        console.error('Error durante el cierre de sesión:', error);
      }
    }
  }
};
</script>

<style>
</style>
