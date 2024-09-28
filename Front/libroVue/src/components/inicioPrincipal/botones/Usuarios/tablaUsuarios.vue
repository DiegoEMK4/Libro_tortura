<template>
  <div class="pa-4">
    <v-card>
      <v-card-title>
        <span class="pa-4 text-center">Lista de Usuarios</span>
      </v-card-title>

      <v-tabs v-model="tab" bg-color="transparent" color="#5E7066" grow>
        <v-tab value="Usuarios activos">Registros activos</v-tab>
        <!-- Mostrar "Todos los registros" solo si el rol es 0 -->
        <v-tab v-if="rol === 0" value="Todos los registros">Todos los Usuarios</v-tab>
      </v-tabs>     

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <comp_registroU @registrarUsuario_exitoso="obtenerUsuarios" />
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
                :items-per-page="5"
                class="elevation-1"
                :search="search"
                :items="usuarios"
              >
                <template v-slot:item.acciones="{ item }">
                  <v-row dense class="d-flex align-center">
                    <v-col cols="auto" v-if="rol === 0" class="mx-2">
                      <comp_editarU :usuario="item" @editarUsuario_exitoso="obtenerUsuarios" />
                    </v-col>
                    <v-col cols="auto" v-if="rol === 0" class="mx-2">
                      <comp_editarCU :id="item.id" />
                    </v-col>
                    <v-col cols="auto" v-if="rol === 0" class="mx-2">
                      <comp_eliminar :id="item.id" @eliminarUsuario_exitoso="obtenerUsuarios" />
                    </v-col>
                  </v-row>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios';
import comp_registroU from '../Usuarios/Registrar/compFlot_registroUsuarios.vue';
import comp_editarU from '../Usuarios/Editar/compFlot_editarUsuario.vue';
import comp_editarCU from '../Usuarios/EditarContrasena/compFlot_editarContrasena.vue';
import comp_eliminar from '../Usuarios/Eliminar/compFlot_eliminarUsuario.vue';

export default {
  computed: {
    rol() {
      const storedData = JSON.parse(localStorage.getItem('usuario'));  
      return storedData?.usuario?.rol_id ?? null;
    }
  },
  components: {
    comp_registroU,
    comp_editarU,
    comp_editarCU,
    comp_eliminar
  },
  data() {
    return {
      tipo_busqueda: 1,
      usuarios: [],
      tab: 'Usuarios activos',
      search: '',
      headers: [
        { text: 'ID', align: 'center', value: 'id' },
        { text: 'Nombre', align: 'center', value: 'nombre' },
        { text: 'Primer apellido', align: 'center', value: 'apellido_P' },
        { text: 'Segundo apellido', align: 'center', value: 'apellido_M' },
        { text: 'Nombre de usuario', align: 'center', value: 'nombre_usuario' },
        { text: 'Rol de usuario', align: 'center', value: 'rol_id' },
        { text: 'Estado de usuario', align: 'center', value: 'estado_usuario' },
        { text: 'Acciones', align: 'center', value: 'acciones', sortable: false }
      ]
    };
  },
  watch: {
    tab(newValue) {
      this.obtenerUsuarios(newValue); 
    }
  },
  mounted() {
    this.obtenerUsuarios(this.tab); 
  },
  methods: {
    async obtenerUsuarios(categoria) {
      this.tipo_busqueda = categoria === 'Usuarios activos' ? 1 : 0;
      try {
        const res = await axios.get('http://localhost:5654/api/usuario/buscaUsuarios', {
          params: {
            tipo_busqueda: this.tipo_busqueda,
          }
        });
        this.usuarios = res.data.map(usuario => {
          usuario.rol_id = usuario.rol_id === 1 ? 'Capturador' : usuario.rol_id === 2 ? 'Consulta' : 'Admin';
          usuario.estado_usuario = usuario.estado_usuario ? 'Activo' : 'Inactivo';
          return usuario;
        });
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    }
  }
};
</script>

<style scoped>
</style>
