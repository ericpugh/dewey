<template>
    <ul v-if="artworks" class="list-group list-group-flush">
        <a v-for="artwork in artworks"
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
</template>

<script>
    import ArtworkImage from "@/components/ArtworkImage.vue";

    export default {
        name: 'ArtworkList',
        props: ['artworks'],
        components: {
            ArtworkImage
        },
        methods: {
            setArtwork(artwork){
                // Set the artwork in state.
                this.$store.commit('artwork/setArtwork', artwork);
            }
        },
        computed: {
            artwork() {
                return this.$store.state.artwork.artwork
            }
        }
    }
</script>

<style scoped lang="scss">

</style>