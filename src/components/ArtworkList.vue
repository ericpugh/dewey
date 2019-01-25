<template>
    <ul v-if="artworks" class="list-group list-group-flush">
        <a v-for="artwork in artworks"
           :key="artwork.object_number"
           @click="setArtwork(artwork)"
           v-scroll-to="{ el: '#app', duration: 300, easing: 'ease-out'}"
           class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-12 col-sm-2">
                    <b-img-lazy :src="artwork.default_image.thumbnail_image_url" fluid-grow blank-color="#EFEFEF" alt="artwork.title" />
                </div>
                <div class="col-12 col-sm-10">
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
    export default {
        name: 'ArtworkList',
        props: ['artworks'],
        methods: {
            setArtwork(artwork){
                // Set the selected artwork in state.
                this.$store.commit('artwork/SET', artwork);
                // Return to "search" page.
                this.$router.push({ name: 'search' });
                // Add or move the selected to the top of the recent artworks list.
                this.$store.commit('recent/ADD', artwork);
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