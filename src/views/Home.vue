<template>
  <div class="home">
    <nav class="navbar fixed-top navbar-light bg-light shadow-sm">
      <span class="navbar-brand">
        <img alt="Smithsonian American Art logo" src="../assets/logo.png" height="40px">
      </span>
      <form class="form-inline d-inline w-75">
        <AutoComplete :items="[ '1994.17', '1984.149.1', '1968.155.8', '1968.155.64']" />
      </form>
    </nav>
    <Artwork/>
  </div>
</template>

<script>
  // @ is an alias to /src
  import AutoComplete from "@/components/AutoComplete.vue";
  import Artwork from "@/components/Artwork.vue";

  export default {
    name: "home",
    components: {
      AutoComplete,
      Artwork
    }
  };
</script>

<style lang="scss">
  #app {
    padding-top: 70px;
  }
</style>