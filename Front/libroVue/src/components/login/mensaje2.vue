<template>
  <v-footer app class="footer">
    <v-container>
      <v-row align="center" class="py-0" justify="center">
    
        <v-col cols="12" md="5" class="text-center">
          <span class="footer-text">
            Algunos derechos reservados 2024. Gobierno del Estado de México
          </span>
        </v-col>

        <v-col cols="12" md="6" class="text-center">
          <a href="https://fgjem.edomex.gob.mx/" class="footer-link" target="_blank">
          Fiscalía General de Justicia del Estado de México
          </a>
       </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
  
    };
  },
};
</script>

<style scoped>
.footer {
  background-color: #4f5b62; 
  color: #7aa18c; 
  padding: 2px 0;
}

.footer-icon-btn {
  margin: 0 2px; 
}

.footer-text {
  font-size: 0.9rem;
  color: #e0e0e0;
  margin-bottom: 2px; 
}

</style>
