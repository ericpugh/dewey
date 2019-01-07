<template>
  <div class="home">
    <header>
      <img alt="Vue logo" src="../assets/logo.png">
    </header>
    <AutoComplete :items="[ '1994.17', '1984.149.1', '1968.155.8', '1968.155.64']" />
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
