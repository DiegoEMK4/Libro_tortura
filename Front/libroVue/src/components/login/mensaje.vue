<template>
  <v-app-bar app color="#4D6156" dark >
    <v-row align="center" class="pa-0" no-gutters>
      <v-col cols="auto">
        <div class="text-center">
          <v-img
            src="@/assets/OIP (2).png"
            alt="OIP(2)"
            contain
            height="10"
            class="ml-2"
          ></v-img>
          <div class="text-caption mt-2">ESTADO DE MÉXICO</div>
        </div>
      </v-col>
      
      <v-col class="text-center">
  <v-toolbar-title class="white--text" style="font-size: 32px; font-weight: bold;">
    Fiscalía General de Justicia del Estado de México
  </v-toolbar-title>
</v-col>

      <v-col cols="auto">
        <v-img
          src="@/assets/logo3.png"
          alt="Logo3"
          contain
          height="40"
          class="mr-2"
        ></v-img>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style scoped>
.v-toolbar-title {
  font-size: 1.25rem;
}
.v-row {
  width: 100%;
}
.text-caption {
  font-size: 0.75rem;
}
.text-center {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
