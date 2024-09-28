<template>
    <div>
      <barraNavegadora/>
      <comp_registroSesiones/>
    </div>
    
  </template>
  
  <script>
  import barraNavegadora from '../../components/inicioPrincipal/barraNavegador.vue';
  import comp_registroSesiones from '../../components/inicioPrincipal/botones/Sesiones/tablaSesiones.vue';
  
  export default {
    components: {
      barraNavegadora,
      comp_registroSesiones
    }
  };
  </script>