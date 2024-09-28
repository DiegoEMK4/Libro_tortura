<template>
    <div>
      <barraNavegadora/>
      <crear_excel/>
    </div>
    
  </template>
  
  <script>
  import barraNavegadora from '../../components/inicioPrincipal/barraNavegador.vue';
import Crear_excel from '../../components/inicioPrincipal/botones/Excel/crear_excel.vue';
  import crear_excel from '../../components/inicioPrincipal/botones/Excel/crear_excel.vue';
  
  export default {
    components: {
      barraNavegadora,
      crear_excel
    
    }
  };
  </script>