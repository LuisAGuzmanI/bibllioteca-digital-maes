<template>
  <div class="grid">
    <div class="col-12">
      <div class="card mb-3">
        <div class="flex card-container">
          <div class="inline-block flex-1">
            <h2 class="font-bold inline-block">Explorador de archivos</h2>
          </div>
          <div class="inline-block flex-2">
            <FileUpload
              mode="basic"
              name="demo[]"
              chooseLabel="Subir Archivo"
              :customUpload="true"
              @uploader="onUpload"
              :auto="true"
              class="inline-block"
            />
            <!-- <FileUpload
              mode="basic"
              name="demo[]"
              chooseLabel="Subir Archivo"
              url="./upload.php"
              accept="image/*"
              :maxFileSize="1000000"
              @upload="onUpload"
              class="inline-block"
            /> -->
          </div>
        </div>

        <div class="card-container mt-3 p-0">
          <div class="inline-block mr-3">
            <h5 class="font-bold mb-1">Titulo</h5>
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText
                type="text"
                v-model="value1"
                placeholder="Formación del Disco Bilaminar"
                class="w-30rem"
              />
            </span>
          </div>
          <div class="inline-block mr-3">
            <h5 class="font-bold mb-1">Area</h5>
            <Dropdown
              v-model="selectedCity"
              :options="cities"
              optionLabel="name"
              placeholder="Materia"
              emptyMessage="No hay opciones disponibles"
              class="w-16rem"
            />
          </div>
          <div class="inline-block mr-3">
            <h5 class="font-bold mb-1">Materia</h5>
            <Dropdown
              v-model="selectedCity"
              :options="cities"
              optionLabel="name"
              placeholder="Materia"
              emptyMessage="No hay opciones disponibles"
              class="w-16rem"
            />
          </div>
          <div class="inline-block mr-3">
            <h5 class="font-bold mb-1">Tipo</h5>
            <Dropdown
              v-model="selectedCity"
              :options="cities"
              optionLabel="name"
              placeholder="Tipo"
              emptyMessage="No hay opciones disponibles"
              class="w-16rem"
            />
          </div>
          <div class="inline-block mr-3">
            <h5 class="font-bold mb-1">Ordenar por</h5>
            <Dropdown
              v-model="selectedCity"
              :options="cities"
              optionLabel="name"
              placeholder="Ordenar por"
              emptyMessage="No hay opciones disponibles"
              class="w-16rem"
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
import {uploadFile} from "../firebase/storage/documents";

export default {
  data() {
    return {
      tableData: Array(10).fill({
        titulo: "Formación del Disco Bilaminar",
        area: "Medicina",
        materia: "Embriología",
        tipo: "Video",
        fecha: "15/08/2022",
      }),
    };
  },
  methods: {
    async onUpload(e) {
      const file = e.files[0]; 
      console.log(file);
      await uploadFile(file);
    },
  },
};
</script>

<style>
</style>