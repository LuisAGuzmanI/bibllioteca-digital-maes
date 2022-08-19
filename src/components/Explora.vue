<template>
  <Dialog
    header="Subir Archivo"
    closeOnEscape="true"
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
          v-model="value1"
        />
      </div>

      <div class="field">
        <h5 class="font-bold mb-1">Autor</h5>
        <InputText
          id="inputtext"
          placeholder="Autor"
          type="text"
          v-model="value1"
        />
      </div>

      <div class="field">
        <h5 class="font-bold mb-1">Area</h5>
        <Dropdown
          id="dropdown"
          v-model="value8"
          :options="dropdownOptions"
          optionLabel="name"
          placeholder="Area"
        />
      </div>

      <div class="field">
        <h5 class="font-bold mb-1">Materia</h5>
        <Dropdown
          id="dropdown"
          v-model="value8"
          :options="dropdownOptions"
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
          @uploader="onUpload"
          class="felx-2 inline-block"
        />
      </div>

      <div class="flex card-container">
        <span class="inline-block flex-1"> </span>
        <div class="inline-block flex-2">
          <Button
            label="Confirmar"
            icon="pi pi-check"
            @click="onPressModalButton"
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

        <div class="card-container mt-3 p-0">
          <div class="inline-block mr-3">
            <h5 class="font-bold mb-1">Titulo</h5>
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <div class="p-inputgroup">
                <Button @click="onSearch" icon="pi pi-search" />
                <InputText
                  type="text"
                  v-model="titleQuery"
                  @keyup.enter="onSearch"
                  placeholder="Formación del Disco Bilaminar"
                  class="w-30rem"
                />
              </div>
            </span>
          </div>
          <div class="inline-block mr-3">
            <h5 class="font-bold mb-1">Area</h5>
            <Dropdown
              v-model="selectedOption"
              :options="dropdownOptions"
              optionLabel="name"
              placeholder="Area"
              emptyMessage="No hay opciones disponibles"
              class="w-16rem"
            />
          </div>
          <div class="inline-block mr-3">
            <h5 class="font-bold mb-1">Materia</h5>
            <Dropdown
              v-model="selectedOption"
              :options="dropdownOptions"
              optionLabel="name"
              placeholder="Materia"
              emptyMessage="No hay opciones disponibles"
              class="w-16rem"
            />
          </div>
          <div class="inline-block mr-3">
            <h5 class="font-bold mb-1">Tipo</h5>
            <Dropdown
              v-model="selectedOption"
              :options="dropdownOptions"
              optionLabel="name"
              placeholder="Tipo"
              emptyMessage="No hay opciones disponibles"
              class="w-16rem"
            />
          </div>
          <div class="inline-block mr-3">
            <h5 class="font-bold mb-1">Ordenar por</h5>
            <Dropdown
              v-model="selectedOption"
              :options="dropdownOptions"
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
import { uploadFile } from "../firebase/storage/documents";

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
      dropdownOptions: [],
      selectedOption: null,
      display: false,
      titleQuery: "",
    };
  },
  methods: {
    async onUpload(e) {
      const file = e.files[0];
      console.log(file);
      await uploadFile(file);
    },
    onPressModalButton() {
      this.display = true;
    },
    onSearch() {
      console.log("Hello from onSearch!", this.titleQuery);
    },
  },
};
</script>

<style>
</style>