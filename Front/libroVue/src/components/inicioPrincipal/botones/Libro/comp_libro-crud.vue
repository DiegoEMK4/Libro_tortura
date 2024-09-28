<template>
  <div class="pa-4">
    <v-card>
      <v-card-title>
        <span class="pa-4 text-center">Lista de Registros</span>
      </v-card-title>

      <v-tabs v-model="tab" bg-color="transparent" color="#5E7066" grow>
        <v-tab value="Registros activos">Registros activos</v-tab>
        <!-- Mostrar "Todos los registros" solo si el rol es 0 -->
        <v-tab v-if="rol === 0" value="Todos los registros">Todos los registros</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item :value="tab">
          <v-card flat>
            <v-card-text>
              <comp_registroL @registroLibro_exitoso="obtenerLibros" />            
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
                :items="libros"
              >
                <template v-slot:item.acciones="{ item }">
                  <v-row dense class="d-flex align-center">
                    <v-col cols="auto" v-if="rol === 0 || rol === 1" class="mx-2">
                      <comp_editarL :libro="item" @editarLibro_exitoso="obtenerLibros" />
                    </v-col>
                    <v-col cols="auto" v-if="rol === 0" class="mx-2">
                      <comp_eliminarL :id="item.id" @eliminacion_exitosa="obtenerLibros" /> 
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
import comp_registroL from '../Libro/Registro/compFlot_registroLibro.vue';
import comp_editarL from '../Libro/Editar/compFlot_editarLibro.vue';
import comp_eliminarL from '../Libro/Eliminar/compFlot_eliminar.vue';

export default {
  computed: {
    rol() {
      const storedData = JSON.parse(localStorage.getItem('usuario'));
      return storedData?.usuario?.rol_id ?? null;
    }
  },
  components: {
    comp_registroL,
    comp_editarL,
    comp_eliminarL
  },
  data() {
    return {
      tipo_busqueda: 1,
      libros: [],
      tab: 'Registros activos', 
      search: '',
      headers: [
        { title: 'ID', align: 'center', value: 'id' },
        { title: 'No. Expediente', align: 'center', value: 'expediente' },
        { title: 'Fecha de solicitud', align: 'center', value: 'fecha_solicitud' },
        { title: 'Fecha de emisión', align: 'center', value: 'fecha_emision' },
        { title: 'Nombre del perito', align: 'center', value: 'nombre_perito' },
        { title: 'NIC', align: 'center', value: 'nic' },
        { title: 'NUC', align: 'center', value: 'nuc' },
        { title: 'Carpeta de investigación', align: 'center', value: 'carpeta_investigacion' },
        { title: 'Documento emitido', align: 'center', value: 'documento_emitido' },
        { title: 'Materia Pericial', align: 'center', value: 'materia_pericial' },
        { title: 'Agencia', align: 'center', value: 'agencia' },
        { title: 'Opciones', align: 'center', value: 'acciones', sortable: false }
      ]
    };
  },
  watch: {
    tab(newValue) {
      this.obtenerLibros(newValue); 
    }
  },
  mounted() {
    this.obtenerLibros(this.tab); 
  },
  methods: {
    async obtenerLibros(categoria) {
      this.tipo_busqueda = categoria === 'Registros activos' ? 1 : 0;
      try {
        const response = await axios.get('http://localhost:5654/api/libro/buscarLibros', {
          params: {
            tipo_busqueda: this.tipo_busqueda,
          }
        });
        this.libros = response.data;
      } catch (error) {
        console.error('Error al obtener libros:', error);
      }
    }
  }
};
</script>

<style scoped>
</style>
