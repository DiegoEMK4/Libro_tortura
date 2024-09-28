<template>
    <div>
      <barraNavegadora/>
      <comp_registroLibro/>
    </div>
    
  </template>
  
  <script>
  import barraNavegadora from '../../components/inicioPrincipal/barraNavegador.vue';
  import comp_registroLibro from '../../components/inicioPrincipal/botones/comp_registroLibro.vue';
  
  export default {
    components: {
      barraNavegadora,
      comp_registroLibro
    }
  };
  </script>