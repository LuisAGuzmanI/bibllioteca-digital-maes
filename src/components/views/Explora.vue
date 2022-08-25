<template>
  <!-- TODO: Convertir este Dialog en un componente separado -->
  <Dialog
    header="Subir Archivo"
    :closeOnEscape="true"
    v-model:visible="displayUpload"
    modal="modal"
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
        <FileUpload
          mode="basic"
          chooseLabel="Subir Archivo"
          :customUpload="true"
          :auto="true"
          @uploader="onFileSubmit"
          class="felx-2"
        />
        <P class="font-medium text-green-600" v-if="!!fileUpload">Cargado exitosamente: {{fileUpload.name}}</P>
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

  <Dialog
    :header="selectedRow.title"
    :closeOnEscape="true"
    :dismissableMask="true"
    v-model:visible="displayMaterial"
    modal="modal"
    appendTo="body"
  >
    <div class="p-fluid">
      <div class="card-container flex mb-3">
        <div class="inline-block flex-1">
          <p class="font-bold">{{ this.selectedRow.subjectDisplay }}</p>
        </div>
        <div class="inline-block flex-2">
          <p class="font-bold">
            Por: {{ this.selectedRow.autor }} -
            {{ this.selectedRow.formatedDate }}
          </p>
        </div>
      </div>

      <video width="888" height="500" controls>
        <source :src="this.selectedRow.fileUrl" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
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
            <h5 class="font-bold mb-2">Titulo</h5>
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
            <h5 class="font-bold mb-2">Area</h5>
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
            <h5 class="font-bold mb-2">Materia</h5>
            <Dropdown
              v-model="subjectQuery"
              :options="subjectOptions"
              optionLabel="name"
              placeholder="Materia"
              :disabled="subjectOptions.length < 1"
              emptyMessage="No hay opciones disponibles"
              class="w-full"
            />
          </div>
          <div class="lg:col-2 md:col-12 sm:col-12 mr-3">
            <h5 class="font-bold mb-2">Tipo</h5>
            <Dropdown
              v-model="typeQuery"
              :options="typeOptions"
              optionLabel="name"
              placeholder="Tipo"
              emptyMessage="No hay opciones disponibles"
              class="w-full"
            />
          </div>
          <div class="lg:col-2 md:col-12 sm:col-12">
            <h5 class="font-bold mb-2">Filtros</h5>
            <Button
              v-if="!areFilters"
              label="Borrar Filtros"
              icon="pi pi-times"
              disabled="disabled"
            />
            <Button
              v-else
              label="Borrar Filtros"
              icon="pi pi-times"
              @click="eraseFilters"
            />
          </div>
        </div>
        <DataTable
          :value="displayTableData"
          v-model:selection="selectedRow"
          selectionMode="single"
          stripedRows
          responsiveLayout="scroll"
          class="mt-3"
        >
          <Column field="title" header="Titulo" :sortable="true"></Column>
          <Column
            field="formatedDate"
            header="Fecha Añadido"
            :sortable="true"
          ></Column>
          <Column field="areaDisplay" header="Area"></Column>
          <Column field="subjectDisplay" header="Materia"></Column>
          <Column field="type" header="Tipo"></Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script>
// import formatDate from "../../helpers/formatDate";
import { uploadFile, getFileUrl } from "../../firebase/storage/documents";
import { getSubjectsFromArea } from "../../firebase/firestore/areas-subjects";
import {
  getMaterials,
  createMaterial,
} from "../../firebase/firestore/material";

export default {
  data() {
    return {
      tableData: [],
      displayTableData: [],
      displayMaterial: false,
      selectedRow: {
        autor: "",
        title: "",
        type: "",
        area: "",
        subject: "",
        areaDisplay: "",
        subjectDisplay: "",
        fileUrl: "",
      },

      displayUpload: false,

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
      ],
      subjectOptions: [],
      formSubjetOptions: [],

      // Search query parameters
      titleQuery: "",
      areaQuery: "",
      subjectQuery: "",
      typeQuery: "",

      // File form data
      fileUpload: null,
      titleUpload: "",
      autorUpload: "",
      areaUpload: "",
      subjectUpload: "",

      isLoadingSubmitButton: false,
    };
  },
  async created() {
    this.tableData = await getMaterials();
    this.displayTableData = this.tableData;
  },
  methods: {
    onFileSubmit(e) {
      const file = e.files[0];
      console.log(file.name)
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
      this.displayUpload = false;
    },
    onPressModalButton() {
      this.displayUpload = true;
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
    onAplyFilterArea() {
      this.displayTableData.filter((row) => {
        return row.subject == this.subjectQuery;
      });
    },
    eraseFilters(){
      this.titleQuery =  "";
      this.areaQuery =  "";
      this.subjectQuery =  "";
      this.typeQuery =  "";
      this.displayTableData = this.tableData;
    }
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
    areFilters() {
      console.log(!!this.areaQuery || !!this.subjectQuery || !!this.typeQuery || !!this.titleQuery)
      return (
        !!this.areaQuery ||
        !!this.subjectQuery ||
        !!this.typeQuery ||
        !!this.titleQuery
      );
    },
  },
  watch: {
    areaQuery() {
      if(this.areaQuery !== ""){
        this.displayTableData = this.tableData.filter((row) => {
          return row.area == this.areaQuery.code;
        });
        this.upadteSubjectOptions();
      }
    },
    subjectQuery() {
      if(this.subjectQuery !== ""){
        this.displayTableData = this.tableData.filter((row) => {
          return row.subject == this.subjectQuery.name;
        });
      }
    },
    typeQuery() {
      if(this.typeQuery !== ""){
        this.displayTableData = this.tableData.filter((row) => {
          return row.type == this.typeQuery.name;
        });
      }
    },
    areaUpload() {
      this.upadteFormSubjectOptions();
    },
    selectedRow() {
      console.log(this.selectedRow.fileUrl);
      this.displayMaterial = true;
    },
  },
};
</script>

<style>
</style>