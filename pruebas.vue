<template>
    <div>
      <v-btn @click="downloadExcel">Descargar Excel</v-btn>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    methods: {
      async downloadExcel() {
        try {
          const response = await axios.get('http://localhost:3000/api/excel', {
            responseType: 'blob', 
          });
  
      
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'archivo.xlsx');
          document.body.appendChild(link);
          link.click();
        } catch (error) {
          console.error('Error al descargar el archivo:', error);
        }
      },
    },
  };
  </script>
  