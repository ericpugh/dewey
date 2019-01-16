<template>
    <div v-if="artwork && Object.keys(artwork).length !== 0" class="artwork result">
        <!-- Tombstone -->
        <div class="row">
            <div class="col-md">
                <ArtworkImage :src="artwork.medium_image_url" :alt="artwork.title" title="artwork.title"></ArtworkImage>
            </div>
            <div class="col-md">
                <dl class="attributes dl-horizontal">
                    <dt v-if="artwork.title || artwork.long_title" class="label">Title</dt>
                    <dd v-if="artwork.title" class="title">{{ artwork.title }}</dd>
                    <dd v-else-if="artwork.long_title" class="title">{{ artwork.long_title }}</dd>
                    <dt v-if="artwork.object_number" class="label">Object Number</dt>
                    <dd v-if="artwork.object_number" class="object-number">
                        {{ artwork.object_number }}
                    </dd>
                    <dt v-if="artwork.dated" class="label">Date</dt>
                    <dd v-if="artwork.dated" class="date">
                        {{ artwork.dated }}
                    </dd>
                    <dt v-if="artwork.dimensions" class="label">Dimensions</dt>
                    <dd v-if="artwork.dimensions" class="dimensions">
                        {{ artwork.dimensions }}
                    </dd>
                    <dt v-if="artwork.copyright" class="label">Copyright</dt>
                    <dd v-if="artwork.copyright" class="copyright">
                        {{ artwork.copyright }}
                    </dd>
                    <dt v-if="artwork.credit_line" class="label">Credit</dt>
                    <dd v-if="artwork.credit_line" class="credit">
                        <p>Smithsonian American Art Museum</p>
                        <p>{{ artwork.credit_line }}</p>
                    </dd>
                    <dt v-if="artwork.display_mediums" class="label">Mediums</dt>
                    <dd v-if="artwork.display_mediums" class="mediums">
                        {{ artwork.display_mediums }}
                    </dd>
                    <dt v-if="artwork.ontology" class="label">Keywords</dt>
                    <dd v-for="keyword in artwork.ontology" class="ontology">
                        <p v-html="keyword"></p>
                    </dd>

                </dl>
            </div>
        </div>

        <!-- descriptions -->
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
        <div v-if="artwork.luce_center_label" class="description card bg-light">
            <div class="card-body">
                <h5 class="card-title">Luce Center Label</h5>
                <div v-html="artwork.luce_center_label" class="card-text">
                    {{ artwork.luce_center_label }}
                </div>
            </div>
        </div>
        <div v-if="artwork.luce_object_quote" class="description card bg-light">
            <div class="card-body">
                <h5 class="card-title">Luce Center Label</h5>
                <blockquote v-html="artwork.luce_object_quote" class="card-text">
                    {{ artwork.luce_object_quote }}
                </blockquote>
            </div>
        </div>
        <div v-if="artwork.new_acquisition_label" class="description card bg-light">
            <div class="card-body">
                <h5 class="card-title">Aquisition Label</h5>
                <div v-html="artwork.new_acquisition_label" class="card-text">
                    {{ artwork.new_acquisition_label }}
                </div>
            </div>
        </div>
        <div v-if="artwork.publication_label" class="description card bg-light">
            <div class="card-body">
                <h5 class="card-title">Publication Label</h5>
                <div v-html="artwork.publication_label" class="card-text">
                    {{ artwork.publication_label }}
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
