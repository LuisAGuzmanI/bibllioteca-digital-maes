<template>
  <hr />
  <div class="flex">
    <div class="flex-1 ml-3">
      <span class="font-medium ml-2">Template</span>
      <a href="https://www.primefaces.org/sakai-vue/#/" target="_blank">
        <img alt="Logo" :src="footerImage()" height="20" class="mr-2 ml-2" />
      </a>
      by
      <span class="font-medium ml-2">PrimeVue</span>
    </div>
    <div class="flex-2">
      <a href="https://discord.gg/Xtq3MVG" class="mr-3">
        <i class="pi pi-discord" style="font-size: 20px; color: #495057"></i>
      </a>
      <a href="https://www.instagram.com/maestec/" class="mr-3">
        <i class="pi pi-instagram" style="font-size: 20px; color: #495057"></i>
      </a>
      <a href="https://www.tiktok.com/@maes.tec" class="mr-3">
        <i class="pi pi-hashtag" style="font-size: 20px; color: #495057"></i>
      </a>
      <a href="https://www.facebook.com/mae.itesm" class="mr-3">
        <i class="pi pi-facebook" style="font-size: 20px; color: #495057"></i>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppFooter",
  methods: {
    footerImage() {
      return this.$appState.darkTheme
        ? "images/logo-white.svg"
        : "images/logo-dark.svg";
    },
  },
  computed: {
    darkTheme() {
      return this.$appState.darkTheme;
    },
  },
};
</script>