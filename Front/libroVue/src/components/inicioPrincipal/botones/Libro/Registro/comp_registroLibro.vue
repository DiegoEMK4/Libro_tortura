<template>
  <v-app>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card>
            <v-card-title>
              <span class="headline">Registrar Libro</span>
            </v-card-title>
            <v-card-text>
              <v-form ref="form" v-model="valid">
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="record.expediente"
                      :rules="requiredRules"
                      label="Expediente"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6">  
                  <form 
                   method="post" 
                   action="/send/">
                   Fecha de solicitud:
                  <input 
                  type="date" 
                  value="2024-02-25">
                  </form>
                  </v-col>

                  <v-col cols="12" md="6">
                  <form 
                   method="post" 
                   action="/send/">
                   Fecha de emisión:
                  <input 
                  type="date" 
                  value="2024-02-25">
                  </form>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-select
                      v-model="record.carpetaInv"
                      :items="carpetaI"
                      label="Carpeta de investigación"
                      required
                    ></v-select>
                  </v-col>
                  
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="record.documentType"
                      :items="documentTypes"
                      label="Tipo de Documento"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="6">

                    <v-text-field
                      v-model="record.agency"
                      :rules="requiredRules"
                      label="Agencia"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12">
                    <v-card-title>
                      <span class="headline">Datos del Perito</span>
                    </v-card-title>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="expert.nombre"
                      :rules="requiredRules"
                      label="Nombre"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="expert.apellidoPaterno"
                      :rules="requiredRules"
                      label="Apellido Paterno"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="expert.apellidoMaterno"
                      :rules="requiredRules"
                      label="Apellido Materno"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="expert.numeroGafete"
                      :rules="requiredRules"
                      label="Número de Gafete"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="expert.area"
                      :rules="requiredRules"
                      label="Área que Desempeña"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="submit">Registrar</v-btn>
              <v-btn color="secondary" @click="reset">Limpiar</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      solicitudMenu: false,
      emisionMenu: false,
      record: {
        expediente: '',
        fechaSolicitud: '',
        fechaEmision: '',
        carpetaI: '',
        documentType: '',
        agency: ''
      },
      expert: {
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        numeroGafete: '',
        area: ''
      },
      requiredRules: [v => !!v || 'El campo es obligatorio'],
      carpetaI: ['NIC', 'NUC'],
      documentTypes: ['Dictamen', 'Informe']
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        
        console.log('Registro:', this.record);
        console.log('Datos del Perito:', this.expert);
      }
    },
    reset() {
      this.$refs.form.reset();
      this.record = {
        expediente: '',
        fechaSolicitud: '',
        fechaEmision: '',
        nic: '',
        nuc: '',
        documentType: '',
        agency: ''
      };
      this.expert = {
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        numeroGafete: '',
        area: ''
      };
    }
  }
};
</script>

<style scoped>
.headline {
  font-size: 24px;
  font-weight: 500;
}
</style>
