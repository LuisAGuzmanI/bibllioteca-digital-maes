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
          v-if="userCanUpload"
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
import { getCurrentUser } from "../../firebase/firestore/users";
// import { useUsersStore } from "../../stores/users";

// const userStore = useUsersStore();
// const {admin, coordi, mae} = userStore.userData.roles;

export default {
  components: {
    UploadDialog,
    MaterialsTableVue,
  },
  data() {
    return {
      displayUpload: false,
      userCanUpload: false,

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
  async created() {
    const currentUser = await getCurrentUser();
    const {admin, coordi, mae} = currentUser.roles
    this.userCanUpload = admin || coordi || mae;
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