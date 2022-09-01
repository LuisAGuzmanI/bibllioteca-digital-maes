<template>
  <Dialog
    header="Subir Archivo"
    v-model:visible="isActive"
    modal="modal"
    :closeOnEscape="true"
  >
    <div class="p-fluid w-30rem">
      <div class="field">
        <h5 class="font-bold mb-3">Titulo</h5>
        <InputText
          id="inputtext"
          placeholder="Titulo"
          type="text"
          v-model="titleUpload"
        />
      </div>

      <div class="field">
        <h5 class="font-bold mb-3">Autor</h5>
        <InputText
          id="inputtext"
          placeholder="Autor"
          type="text"
          v-model="autorUpload"
        />
      </div>

      <div class="field">
        <h5 class="font-bold mb-3">Area</h5>
        <Dropdown
          id="dropdown"
          v-model="areaUpload"
          :options="areaOptions"
          optionLabel="name"
          placeholder="Area"
        />
      </div>

      <div class="field">
        <h5 class="font-bold mb-3">Materia</h5>
        <Dropdown
          id="dropdown"
          v-model="subjectUpload"
          :options="formSubjetOptions"
          :disabled="formSubjetOptions.length < 1"
          optionLabel="name"
          placeholder="Materia"
        />
      </div>

      <div class="field">
        <h5 class="font-bold mb-3">Archivo</h5>
        <div class="inline-block">
          <FileUpload
            mode="basic"
            chooseLabel="Subir Archivo"
            :customUpload="true"
            :auto="true"
            accept="video/*"
            @uploader="onFileSubmit"
          />
        </div>
        <div class="inline-block align-items-center">
          <Tag
            v-if="!!fileUpload"
            class="ml-3"
            icon="pi pi-check"
            severity="success"
            value="Cargado Exitosamente"
          ></Tag>
        </div>

        <P v-if="!!fileUpload" class="font-medium">{{ fileUpload.name }}</P>
      </div>

      <div class="flex card-container">
        <span class="inline-block flex-1"> </span>
        <div class="inline-block flex-2">
          <Button
            v-if="!enableSubmitButton"
            label="Confirmar"
            icon="pi pi-check"
            disabled="disabled"
          />
          <Button
            v-else
            label="Confirmar"
            icon="pi pi-check"
            @click="onSubmit"
            :loading="isLoadingSubmitButton"
          />
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script>
// Firebase Imports
import { uploadFile, getFileUrl } from "../../firebase/storage/documents";
import { createMaterial } from "../../firebase/firestore/material";
import { getSubjectsFromArea } from "../../firebase/firestore/areas-subjects";

export default {
  props: {
    isActiveProp: Boolean,
    areaOptions: Array,
  },
  data() {
    return {
      isActive: false,

      formSubjetOptions: [],

      // File form data
      fileUpload: null,
      titleUpload: "",
      autorUpload: "",
      areaUpload: "",
      subjectUpload: "",

      isLoadingSubmitButton: false,
    };
  },
  methods: {
    async upadteFormSubjectOptions() {
      this.formSubjetOptions = await getSubjectsFromArea(this.areaUpload.code);
    },
    onFileSubmit(e) {
      const file = e.files[0];
      console.log(file);
      this.fileUpload = file;
    },
    async onSubmit() {
      this.isLoadingSubmitButton = true;

      const strgRef = await uploadFile(this.fileUpload);

      const fileUrl = await getFileUrl(strgRef);

      await createMaterial({
        autor: this.autorUpload,
        title: this.titleUpload,
        type: this.fileUpload.type,
        area: this.areaUpload.code,
        subject: this.subjectUpload.code,
        areaDisplay: this.areaUpload.name,
        subjectDisplay: this.subjectUpload.name,
        fileUrl,
      });

      this.fileUpload = null;
      this.titleUpload = "";
      this.autorUpload = "";
      this.areaUpload = "";
      this.subjectUpload = "";

      this.isLoadingSubmitButton = false;
      this.isActive = false;
    },
  },
  computed: {
    enableSubmitButton() {
      return (
        !!this.fileUpload &&
        !!this.titleUpload &&
        !!this.autorUpload &&
        !!this.areaUpload &&
        !!this.subjectUpload
      );
    },
  },
  watch: {
    isActiveProp() {
      this.isActive = this.isActiveProp;
    },
    isActive() {
      console.log(this.isActive);
      if (!this.isActive) {
        this.$emit("colseUploadDialog");
      }
    },
    areaUpload() {
      this.upadteFormSubjectOptions();
    },
  },
};
</script>

<style>
</style>