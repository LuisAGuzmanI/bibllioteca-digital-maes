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
        </div>
        <DataTable
          :value="tableData"
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
        <div v-if="selectedRow !== null">
          <video width="320" height="240" controls>
            <source src="https://firebasestorage.googleapis.com/v0/b/biblioteca-digital-maes.appspot.com/o/redditsave.com_se_tenia_que_hacer-v98jbg0dswi91.mp4-f703dd2b-cb9e-4ef2-840f-e0b8d8bfadaa?alt=media&token=bd7dea2b-3978-44c4-8923-66b772356a3c" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import formatDate from "../../helpers/formatDate";
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
      selectedRow: null,

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
    };
  },
  async created() {
    this.tableData = await getMaterials();
    this.tableData.map((element) => {
      element.formatedDate = formatDate(new Date(element.date.seconds * 1000));
      return element;
    });
  },
  methods: {
    onFileSubmit(e) {
      const file = e.files[0];
      this.fileUpload = file;
      // await uploadFile(file);
    },
    async onSubmit() {
      const strgRef = await uploadFile(this.fileUpload);

      const fileUrl = await getFileUrl(strgRef);

      await createMaterial({
        autor: this.autorUpload,
        title: this.titleUpload,
        type: this.fileUpload.type.split("/")[1],
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
    areaQuery() {
      this.upadteSubjectOptions();
    },
    areaUpload() {
      this.upadteFormSubjectOptions();
    },
    selectedRow() {
      console.log(this.selectedRow.fileUrl);
    },
  },
};
</script>

<style>
</style>