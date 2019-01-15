<template>
    <div class="artwork">
        <div v-if="artwork" class="result">
            <h1 v-if="artwork.title" class="display-3">{{ artwork.title }}</h1>
            <ArtworkImage :src="artwork.medium_image_url" :alt="artwork.title" title="artwork.title"></ArtworkImage>
            <div v-if="artwork.exhibition_label" class="description card bg-light">
                <div class="card-body">
                    <h5 class="card-title">Exhibition Label</h5>
                    <div v-html="artwork.exhibition_label" class="card-text">
                        {{ artwork.exhibition_label }}
                    </div>
                </div>
            </div>

            <div v-if="artwork.gallery_label" class="description card bg-light">
                <div class="card-body">
                    <h5 class="card-title">Gallery Label</h5>
                    <div v-html="artwork.gallery_label" class="card-text">
                        {{ artwork.gallery_label }}
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
    import Artwork from '../models/ArtworkClass';
    import ArtworkImage from "@/components/ArtworkImage.vue";

    export default {
        name: 'ArtworkRecord',
        components: {
            ArtworkImage
        },
        computed: {
            artwork() {
                return this.$store.state.artwork.artwork
            }
        }
    }
</script>

<style scoped lang="scss">
    .artwork {
        text-align: left;
        margin: 1rem;
        .description {
            margin: 1rem 0;
        }
    }
</style>
