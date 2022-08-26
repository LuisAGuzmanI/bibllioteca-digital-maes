<template>
  <UploadDialog
    @colseUploadDialog="colseUploadDialog"
    :isActiveProp="displayUpload"
    :areaOptions="areaOptions"
  />

  <div class="card">
    <div class="flex card-container">
      <div class="inline-block flex-1">
        <h2 class="font-bold inline-block">Explorador de archivos</h2>
      </div>
      <div class="inline-block flex-2">
        <Button
          label="Subir Archivo"
          icon="pi pi-upload"
          @click="onPressModalButton"
        />
      </div>
    </div>

    <MaterialsTableVue :areaOptions="areaOptions" />
  </div>
</template>

<script>
// Component Imports
import UploadDialog from "../sub_components/UploadDialog.vue";
import MaterialsTableVue from "../sub_components/MaterialsTable.vue";

export default {
  components: {
    UploadDialog,
    MaterialsTableVue,
  },
  data() {
    return {
      displayUpload: false,

      areaOptions: [
        { name: "Ingeniería", code: "ingenieria" },
        { name: "Ambiente Construido", code: "ambiente-construido" },
        {
          name: "Derecho Economía y Relaciones Internacionales",
          code: "derecho-economia-y-relaciones-internacionales",
        },
        { name: "Estudios Creativos", code: "estudios-creativos" },
        { name: "Negocios", code: "negocios" },
        { name: "Salud", code: "salud" },
      ],
    };
  },
  methods: {
    onPressModalButton() {
      this.displayUpload = true;
    },
    colseUploadDialog() {
      this.displayUpload = false;
    },
  },
};
</script>

<style>
</style>