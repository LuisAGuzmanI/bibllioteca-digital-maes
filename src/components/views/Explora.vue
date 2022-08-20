<template>
  <!-- TODO: Convertir este Dialog en un componente separado -->
  <Dialog
    header="Subir Archivo"
    :closeOnEscape="true"
    v-model:visible="display"
    modal="modal"
  >
    <div class="p-fluid w-30rem">
      <div class="field">
        <h5 class="font-bold mb-1">Titulo</h5>
        <InputText
          id="inputtext"
          placeholder="Titulo"
          type="text"
          v-model="titleUpload"
        />
      </div>

      <div class="field">
        <h5 class="font-bold mb-1">Autor</h5>
        <InputText
          id="inputtext"
          placeholder="Autor"
          type="text"
          v-model="autorUpload"
        />
      </div>

      <div class="field">
        <h5 class="font-bold mb-1">Area</h5>
        <Dropdown
          id="dropdown"
          v-model="areaUpload"
          :options="areaOptions"
          optionLabel="name"
          placeholder="Area"
        />
      </div>

      <div class="field">
        <h5 class="font-bold mb-1">Materia</h5>
        <Dropdown
          id="dropdown"
          v-model="subjectUpload"
          :options="formSubjetOptions"
          optionLabel="name"
          placeholder="Materia"
        />
      </div>

      <div class="field">
        <h5 class="font-bold mb-1">Archivo</h5>
        <FileUpload
          mode="basic"
          chooseLabel="Subir Archivo"
          :customUpload="true"
          :auto="true"
          @uploader="onFileSubmit"
          class="felx-2"
        />
      </div>

      <div class="flex card-container">
        <span class="inline-block flex-1"> </span>
        <div class="inline-block flex-2">
          <!-- TODO: Hacer que el botón solo esté disponible si ya se llenaron todos los campos -->
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
          />
        </div>
      </div>
    </div>
  </Dialog>
  <div class="grid">
    <div class="col-12">
      <div class="card mb-3">
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

        <div class="grid mt-3 p-0">
          <div class="lg:col-3 sm:col-12 mr-3">
            <h5 class="font-bold mb-1">Titulo</h5>
            <span class="p-input-icon-left w-full">
              <i class="pi pi-search" />
              <div class="p-inputgroup">
                <Button @click="onSearch" icon="pi pi-search" />
                <InputText
                  type="text"
                  v-model="titleQuery"
                  @keyup.enter="onSearch"
                  placeholder="Formación del Disco Bilaminar"
                  class="w-full"
                />
              </div>
            </span>
          </div>
          <div class="lg:col-2 md:col-12 sm:col-12 mr-3">
            <h5 class="font-bold mb-1">Area</h5>
            <Dropdown
              v-model="areaQuery"
              :options="areaOptions"
              optionLabel="name"
              placeholder="Area"
              emptyMessage="No hay opciones disponibles"
              class="w-full"
            />
          </div>
          <div class="lg:col-2 md:col-12 sm:col-12 mr-3">
            <h5 class="font-bold mb-1">Materia</h5>
            <Dropdown
              v-model="subjectQuery"
              :options="subjectOptions"
              optionLabel="name"
              placeholder="Materia"
              emptyMessage="No hay opciones disponibles"
              class="w-full"
            />
          </div>
          <div class="lg:col-2 md:col-12 sm:col-12 mr-3">
            <h5 class="font-bold mb-1">Tipo</h5>
            <Dropdown
              v-model="typeQuery"
              :options="typeOptions"
              optionLabel="name"
              placeholder="Tipo"
              emptyMessage="No hay opciones disponibles"
              class="w-full"
            />
          </div>
          <div class="lg:col-2 md:col-12 sm:col-12 mr-3">
            <h5 class="font-bold mb-1">Ordenar por</h5>
            <Dropdown
              v-model="sotringQuery"
              :options="sortingOptions"
              optionLabel="name"
              placeholder="Ordenar por"
              emptyMessage="No hay opciones disponibles"
              class="w-full"
            />
          </div>
        </div>
        <DataTable :value="tableData" class="mt-3">
          <Column field="titulo" header="Titulo"></Column>
          <Column field="area" header="Area"></Column>
          <Column field="materia" header="Materia"></Column>
          <Column field="tipo" header="Tipo"></Column>
          <Column field="fecha" header="Fecha Añadido"></Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script>
import { uploadFile } from "../../firebase/storage/documents";
import { getSubjectsFromArea } from "../../firebase/firestore/areas-subjects";
import { createMaterial } from "../../firebase/firestore/material";

export default {
  data() {
    return {
      tableData: Array(20).fill({
        titulo: "Formación del Disco Bilaminar",
        area: "Medicina",
        materia: "Embriología",
        tipo: "Video",
        fecha: "15/08/2022",
      }),
      selectedOption: null,
      display: false,

      // Dropdown options
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
      typeOptions: [
        { name: "Video", code: "video" },
        { name: "PDF", code: "pdf" },
        { name: "Hoja de calculo de Excel", code: "excel" },
      ],
      subjectOptions: [],
      formSubjetOptions: [],
      sortingOptions: [
        { name: "Fecha", code: "date" },
        { name: "Titulo", code: "date" },
      ],

      // Search query parameters
      titleQuery: "",
      areaQuery: "",
      subjectQuery: "",
      typeQuery: "",
      sotringQuery: "",

      // File form data
      fileUpload: null,
      titleUpload: "",
      autorUpload: "",
      areaUpload: "",
      subjectUpload: "",
    };
  },
  methods: {
    onFileSubmit(e) {
      const file = e.files[0];
      this.fileUpload = file;
      // await uploadFile(file);
    },
    async onSubmit() {

      const docRefId = await createMaterial({
        autor: this.autorUpload,
        title: this.titleUpload,
        area: this.areaUpload.code,
        subject: this.subjectUpload.code
      })

      await uploadFile(this.fileUpload, docRefId);
      
      this.fileUpload = null;
      this.titleUpload = "";
      this.autorUpload = "";
      this.areaUpload = "";
      this.subjectUpload = "";

      this.display = false;

    },
    onPressModalButton() {
      this.display = true;
    },
    onSearch() {
      console.log("Hello from onSearch!", this.titleQuery);
    },
    async upadteSubjectOptions() {
      this.subjectOptions = await getSubjectsFromArea(this.areaQuery.code);
    },
    async upadteFormSubjectOptions() {
      this.formSubjetOptions = await getSubjectsFromArea(this.areaUpload.code);
    },
  },
  computed: {
    enableSubmitButton() {
      return !!this.fileUpload &&  !!this.titleUpload &&  !!this.autorUpload &&  !!this.areaUpload &&  !!this.subjectUpload;
    },
  },
  watch: {
    areaQuery() {
      this.upadteSubjectOptions();
    },
    areaUpload() {
      this.upadteFormSubjectOptions();
    },
  },
};
</script>

<style>
</style>