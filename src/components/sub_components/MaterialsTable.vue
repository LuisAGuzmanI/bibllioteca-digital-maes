<template>
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

  <!-- TODO: Agregar opción para buscar por titulo -->
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
            placeholder="Titulo / Tema del archivo"
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
        icon="pi pi-trash"
        disabled="disabled"
      />
      <Button
        v-else
        label="Borrar Filtros"
        icon="pi pi-trash"
        @click="eraseFilters"
      />
    </div>
  </div>

  <DataTable v-if="!hasLoaded" :value="Array(4)" responsiveLayout="scroll">
    <Column header="Titulo">
      <template #body>
        <Skeleton></Skeleton>
      </template>
    </Column>
    <Column header="Fecha Añadido">
      <template #body>
        <Skeleton></Skeleton>
      </template>
    </Column>
    <Column header="Area">
      <template #body>
        <Skeleton></Skeleton>
      </template>
    </Column>
    <Column header="Materia">
      <template #body>
        <Skeleton></Skeleton>
      </template>
    </Column>
    <Column header="Tipo">
      <template #body>
        <Skeleton></Skeleton>
      </template>
    </Column>
  </DataTable>

  <DataTable
    v-else
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
</template>

<script>
// Firebase Imports
import { getSubjectsFromArea } from "../../firebase/firestore/areas-subjects";
import { getMaterials } from "../../firebase/firestore/material";
import normalizeString from "../../helpers/normalizeString"

export default {
  props: {
    areaOptions: Array,
  },
  data() {
    return {
      hasLoaded: false,
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

      // Dropdown options
      typeOptions: [
        { name: "Video", code: "video" },
        // { name: "PDF", code: "pdf" },
      ],
      subjectOptions: [],

      // Search query parameters
      titleQuery: "",
      areaQuery: "",
      subjectQuery: "",
      typeQuery: "",
    };
  },
  async created() {
    this.tableData = await getMaterials();
    this.displayTableData = this.tableData;
    this.hasLoaded = true;
  },
  methods: {
    onSearch() {
      if (!this.titleQuery) {
        return;
      }
      this.displayTableData = this.displayTableData.filter((row) =>
        normalizeString(row.title).includes(normalizeString(this.titleQuery))
      );
    },
    async upadteSubjectOptions() {
      this.subjectOptions = await getSubjectsFromArea(this.areaQuery.code);
    },
    eraseFilters() {
      this.titleQuery = "";
      this.areaQuery = "";
      this.subjectQuery = "";
      this.typeQuery = "";
      this.displayTableData = this.tableData;
    },
  },
  computed: {
    areFilters() {
      return (
        !!this.areaQuery ||
        !!this.subjectQuery ||
        !!this.typeQuery ||
        !!this.titleQuery
      );
    }
  },
  watch: {
    areaQuery() {
      if (this.areaQuery !== "") {
        this.displayTableData = this.tableData.filter((row) => {
          return row.area == this.areaQuery.code;
        });
        this.upadteSubjectOptions();
      }
    },
    subjectQuery() {
      if (this.subjectQuery !== "") {
        this.displayTableData = this.tableData.filter((row) => {
          return row.subject == this.subjectQuery.name;
        });
      }
    },
    typeQuery() {
      if (this.typeQuery !== "") {
        this.displayTableData = this.tableData.filter((row) => {
          return row.type == this.typeQuery.name;
        });
      }
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