<template>
  <div>
    <barraNavegadora/>
    <comp_tabla/>
  </div>
</template>

<script>
import barraNavegadora from '../../components/inicioPrincipal/barraNavegador.vue';
import comp_tabla from '../../components/inicioPrincipal/botones/Usuarios/tablaUsuarios.vue';

export default {
  components: {
    barraNavegadora,
    comp_tabla,
  }
};
</script>
