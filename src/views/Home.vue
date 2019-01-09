<template>
  <div class="home">
    <Navbar/>
    <form class="form-inline d-inline w-75">
      <AutoComplete :items="[ '1994.17', '1984.149.1', '1968.155.8', '1968.155.64']" />
    </form>
    <Artwork/>
  </div>
</template>

<script>
  // @ is an alias to /src
  import Navbar from "@/components/Navbar.vue";
  import AutoComplete from "@/components/AutoComplete.vue";
  import Artwork from "@/components/Artwork.vue";

  export default {
    name: "home",
    components: {
      Navbar,
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