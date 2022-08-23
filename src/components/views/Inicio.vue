<template>

  <div class="flex align-content-center h-full" style="min-height: 300px">
    <h1 class="flex align-items-center justify-content-center w-full">!En construcción! ✌</h1>
  </div>
  <!-- <div class="grid">
    <div class="col-12 xl:col-6">
      <div class="card mb-3">
        <h2 class="font-bold">Vistos recientemente</h2>
        <Carousel
          :value="archivosVistosRecientemente"
          :numVisible="3"
          :numScroll="3"
          :circular="true"
          :responsiveOptions="responsiveOptionsVistosRecientemente"
        >
          <template #item="archivo">
            <div class="m-2">
              <Card>
                <template #content>
                  <div class="border-round h-14rem surface-200 icon-div-center">
                    <i class="pi pi-file-pdf" style="font-size: 2rem"></i>
                  </div>
                </template>
                <template #title>
                  <div class="h-4rem vertical-text-overflow">
                    <h5>{{ archivo.data }}</h5>
                  </div>
                </template>
              </Card>
            </div>
          </template>
        </Carousel>
      </div>

      <div class="card mb-3">
        <h2 class="font-bold">Proximas asesorías intensivas</h2>
        <span
          v-for="({ fecha, titulo, materia }, index) in asesoriasIntensivasList"
          :key="index"
        >
          <div class="card">
            <div class="grid">
              <div class="col-10">
                <h3 class="text-5xl">{{ titulo }}</h3>
                <h6 class="text-2xl">{{ materia }} - *Nombre de la materia*</h6>
                <h6 class="text-2xl">{{ dateToStringMMDD(fecha.toDate()) }}</h6>
                 TODO: Agregar el titulo de la materia 
              </div>
              <div class="col-2 icon-div-center">
                <i v-if="true" class="pi pi-check" style="font-size: 3rem"></i>
                <i
                  v-else
                  class="pi pi-calendar-plus"
                  style="font-size: 3rem"
                ></i>
              </div>
            </div>
          </div>
        </span>
        <span
          v-for="(
            { titulo, fecha, hora, agendado }, index
          ) in listaAsesoriasIntensivas"
          :key="index"
        >
          <div class="card">
            <div class="grid">
              <div class="col-10">
                <h3 class="text-5xl">{{ titulo }}</h3>
                <h6 class="text-2xl">{{ fecha }} {{ hora }}</h6>
              </div>
              <div class="col-2 icon-div-center">
                <i
                  v-if="agendado"
                  class="pi pi-check"
                  style="font-size: 3rem"
                ></i>
                <i
                  v-else
                  class="pi pi-calendar-plus"
                  style="font-size: 3rem"
                ></i>
              </div>
            </div>
          </div>
        </span>
      </div>
    </div>

    <div class="col-12 xl:col-6">
      <div class="card mb-3">
        <h2 class="font-bold">Tu actividad</h2>
        <Chart type="line" :data="basicData" :options="basicOptions" />
      </div>

      <div class="card mb-3">
        <h2 class="font-bold">Consulta disponibilidad de MAEs</h2>
        <DataTable :value="maesDisponibles">
          <Column field="nombre" header="Nombre"></Column>
          <Column field="semestre" header="Semestre"></Column>
          <Column field="programa" header="Programa"></Column>
        </DataTable>
      </div>
    </div>
  </div> -->
</template>

<script>
// import UsuariosService from "../../firebase/firestore/usuarios-ep";

// import { getAsesoriasIntensivas } from "../../firebase/firestore/asesorias-intensivas-ep";

export default {
  // data() {
  //   return {
  //     archivosVistosRecientemente: [
  //       "Notas Embriología",
  //       "Video Asesoría Anatomía",
  //       "PowerPoint Asesoría Anatomía",
  //       "Cheatsheet Anatomía",
  //       "Video Asesoría Embriología",
  //     ],
  //     responsiveOptionsVistosRecientemente: [
  //       { breakpoint: "1300px", numVisible: 2, numScroll: 1 },
  //       { breakpoint: "600px", numVisible: 1, numScroll: 1 },
  //     ],
  //     listaAsesoriasIntensivas: [],
  //     basicData: {
  //       labels: [
  //         "Enero",
  //         "Febrero",
  //         "Marzo",
  //         "Abril",
  //         "Mayo",
  //         "Junio",
  //         "Julio",
  //       ],
  //       datasets: [
  //         {
  //           label: "Recursos visitados",
  //           data: [65, 59, 80, 81, 56, 55, 40],
  //           fill: true,
  //           borderColor: "#42A5F5",
  //           tension: 0.4,
  //         },
  //       ],
  //     },
  //     maesDisponibles: Array(10).fill({
  //       nombre: "Luis Ángel Guzmán Iribe",
  //       semestre: 4,
  //       programa: "ITC",
  //     }),
  //     asesoriasIntensivasList: null,
  //     usuariosService: null,
  //   };
  // },
  // created() {
  //   this.usuariosService = new UsuariosService();
  //   this.getAsesoriasList();
  // },
  // methods: {
  //   dateToStringMMDD(fecha) {
  //     const meses = [
  //       "Enero",
  //       "Febrero",
  //       "Marzo",
  //       "Abril",
  //       "Mayo",
  //       "Junio",
  //       "Julio",
  //       "Agosto",
  //       "Septiembre",
  //       "Octubre",
  //       "Noviembre",
  //       "Diciembre",
  //     ];
  //     // const fecha = new Date(fechaInt*1000);
  //     console.log(fecha);
  //     return `${fecha.getDay()} / ${meses[fecha.getMonth()]} - ${
  //       fecha.getHours() > 12 ? fecha.getHours() - 12 : fecha.getHours()
  //     }:${
  //       fecha.getMinutes() < 10 ? `0${fecha.getMinutes()}` : fecha.getMinutes()
  //     } ${fecha.getHours() > 12 ? "PM" : "AM"}`;
  //   },
  //   async getAsesoriasList() {
  //     try {
  //       // const asesoriasIntensivas = await getAsesoriasIntensivas();
  //       // this.asesoriasIntensivasList = asesoriasIntensivas;
  //       // console.log("Asesorias Intensivas: ", this.asesoriasIntensivasList);
  //     } catch (error) {
  //       console.log("Error de Fetching [Asesorías Intensivas]", error);
  //       this.asesoriasIntensivasList = ["No se pudo cargar el API"];
  //     }
  //     // TODO: Una vez que se tiene la información de las asesorías. Hacer una función para generar el incono para agregar si no se ha agendado.
  //   },
  // },
};
</script>

<style>
.vertical-text-overflow {
  overflow: hidden;
  -webkit-line-clamp: 3;
}

.icon-div-center {
  align-items: center;
  justify-content: center;
  display: flex;
}
</style>