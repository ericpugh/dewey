<template>
    <div v-if="artwork && Object.keys(artwork).length !== 0" class="artwork result">
        <!-- Tombstone -->
        <div class="row">
            <div class="col-md">
                <ArtworkImage :src="artwork.default_image.medium_image_url" :alt="artwork.title" title="artwork.title"></ArtworkImage>
                <p v-if="artwork.is_on_view && artwork.on_view_location" class="location">
                    {{ artwork.on_view_location.title }}
                </p>
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
                        <li v-html="keyword"></li>
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
                <blockquote v-html="artwork.luce_object_quote" class="card-text">
                    {{ artwork.luce_object_quote }}
                </blockquote>
            </div>
        </div>
        <div v-if="artwork.new_acquisition_label" class="description card bg-light">
            <div class="card-body">
                <h5 class="card-title">Acquisition Label</h5>
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
        <div v-if="artwork.on_view_location" :artworks="this.nearby_artworks" class="nearby">
            <h5>Nearby Artwork</h5>
            <ArtworkList></ArtworkList>
        </div>
    </div>
</template>

<script>
    // import Artwork from '../models/ArtworkClass';
    import ArtworkImage from "@/components/ArtworkImage.vue";
    import ArtworkList from "@/components/ArtworkList.vue";
    import axios from 'axios';

    export default {
        name: 'ArtworkRecord',
        components: {
            ArtworkImage,
            ArtworkList
        },
        data: function () {
            return {
                nearby_artworks: [],
            }
        },
        methods: {
            getNearbyArtworks: async function (query) {
                axios.defaults.headers.common['Accept'] = 'application/vnd.api+json';
                axios.defaults.headers.common['X-Api-Key'] = process.env.VUE_APP_API_KEY;
                var endpoint = 'https://cors-anywhere.herokuapp.com/https://api.si.edu/saam/v1/artworks';
                var filters = '?' +
                    'include=default_image,locations' +
                    '&filter[location-filter][condition][path]=locations.id' +
                    '&filter[location-filter][condition][operator]=%3D' +
                    '&filter[location-filter][condition][value]=' + query +
                    '&page[limit]=6';
                await axios.get(endpoint + filters)
                    .then((response) => {
                        // Convert response data to Artwork class.
                        let items = response.data.data;
                        // Build results
                        let results = [];
                        _.each(artworks, function (artwork) {
                            // TODO: create an array of "artwork" objects.
                            results.push(artwork)
                        });
                        console.log('Nearby results:');
                        console.log(results);
                        // uses Vue.set to be sure to be deeply reactive
                        this.nearby_artworks = results;
                    })
                    .catch(error => {
                        // in case of error, empties the Artwork
                        this.nearby_artworks = [];
                        return Promise.reject(error);
                    });

            }
        },
        computed: {
            artwork() {
                return this.$store.state.artwork.artwork
            }
        },
        created() {
            // Get the "nearby" Artwork list.
            // this.getNearbyArtworks();

        },
        mounted() {},
        destroyed() {}
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
