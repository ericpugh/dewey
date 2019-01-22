<template>
    <div class="recent page">
        <Navbar/>
        <h1 class="display-3">Recently Viewed</h1>
        <ArtworkList v-if="recent.length > 0" :artworks="recent"></ArtworkList>
        <b-alert v-else show variant="secondary">Secondary Alert</b-alert>
        <!--<p v-else class="alert alert-info">-->
            <!--You haven't search for an artwork yet.-->
        <!--</p>-->
    </div>
</template>

<script>
    import Navbar from "@/components/Navbar.vue";
    import ArtworkImage from "@/components/ArtworkImage.vue";
    import ArtworkList from "@/components/ArtworkList.vue";

    export default {
        name: "recent",
        components: {
            Navbar,
            ArtworkImage,
            ArtworkList
        },
        computed: {
            recent() {
                return this.$store.state.recent.recent
            }
        }

    };
</script>
