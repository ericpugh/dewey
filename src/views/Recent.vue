<template>
    <div class="recent page">
        <Navbar/>
        <h1 class="display-3">Recently Viewed</h1>
        <ul v-if="recent" class="list-group list-group-flush">
            <a v-for="artwork in recent"
               :key="artwork.object_number"
               @click="setArtwork(artwork)"
               v-scroll-to="{ el: '#app', duration: 300, easing: 'ease-out'}"
               class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-2">
                        <ArtworkImage :src="artwork.default_image.thumbnail_image_url" :alt="artwork.title" :title="artwork.title"></ArtworkImage>
                    </div>
                    <div class="col-10">
                        <dl class="attributes dl-horizontal">
                            <dt v-if="artwork.title || artwork.long_title" class="label">Title</dt>
                            <dd v-if="artwork.title" class="title">{{ artwork.title }}</dd>
                            <dt v-if="artwork.object_number" class="label">Object Number</dt>
                            <dd v-if="artwork.object_number" class="object-number">
                                {{ artwork.object_number }}
                            </dd>
                        </dl>
                    </div>
                </div>
            </a>
        </ul>
        <p v-else class="alert alert-info">
            You haven't search for an artwork yet.
        </p>
    </div>
</template>

<script>
    import Navbar from "@/components/Navbar.vue";
    import ArtworkImage from "@/components/ArtworkImage.vue";

    export default {
        name: "recent",
        components: {
            Navbar,
            ArtworkImage
        },
        methods: {
            setArtwork(artwork){
                // Set the artwork in state.
                this.$store.commit('artwork/setArtwork', artwork);
                // Return to "search" page.
                this.$router.push({ name: 'search' });
            }
        },
        computed: {
            recent() {
                return this.$store.state.recent.recent
            }
        }

    };
</script>
