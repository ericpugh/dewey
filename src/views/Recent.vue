<template>
    <div class="recent page">
        <Navbar/>
        <h1 class="display-3">Recently Viewed</h1>
        <ArtworkList v-if="recent.length > 0" :artworks="recent"></ArtworkList>
        <b-alert v-else show variant="secondary">You haven't <router-link to="/">searched</router-link> for an artwork yet</b-alert>
    </div>
</template>

<script>
    import Navbar from "@/components/Navbar.vue";
    import ArtworkList from "@/components/ArtworkList.vue";

    export default {
        name: "recent",
        components: {
            Navbar,
            ArtworkList
        },
        computed: {
            recent() {
                return this.$store.state.recent.recent
            }
        }

    };
</script>
