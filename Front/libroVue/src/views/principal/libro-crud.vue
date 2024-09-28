<template>
    <div>
      <barraNavegadora/>
      <libro_crud/>
    </div>
    
  </template>
  
  <script>
  import barraNavegadora from '../../components/inicioPrincipal/barraNavegador.vue';
  import libro_crud from '../../components/inicioPrincipal/botones/Libro/comp_libro-crud.vue';
  
  export default {
    components: {
      barraNavegadora,
      libro_crud,
    }
  };
  </script>