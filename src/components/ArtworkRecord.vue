<template>
    <div v-if="artwork && Object.keys(artwork).length !== 0" class="artwork result">
        <!-- Tombstone -->
        <div class="row">
            <div class="col-md">
                <b-img :src="artwork.default_image.medium_image_url" fluid-grow blank-color="#EFEFEF" alt="artwork.title" />
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
                    <dt v-if="artwork.ontology.length > 0" class="label">Keywords</dt>
                    <dd v-if="artwork.ontology.length > 0" class="ontology">
                        <ul>
                            <li v-for="(keyword, index) in artwork.ontology" :key="index" v-html="keyword"></li>
                        </ul>
                    </dd>

                </dl>
            </div>
        </div>

        <div v-if="loadingAudio" class="text-center">
            <p class="loading animate">Loading Audio<span>.</span><span>.</span><span>.</span></p>
        </div>
        <div v-if="artwork.audio.length > 0">
            <h3>Audio</h3>
            <b-card v-for="audio in artwork.audio" :key="audio.id">
                <AudioPlayer :file="audio.uri.url" :title="audio.title"></AudioPlayer>
            </b-card>
        </div>

        <div v-if="artwork.videos.length > 0">
            <h3>Video</h3>
            <div v-for="video in artwork.videos" :key="video.id">
                <YoutubePlayer :media="video" class="media"></YoutubePlayer>
            </div>
        </div>


        <h3 v-if="artwork.exhibition_label || artwork.gallery_label || artwork.luce_center_label || artwork.luce_object_quote || artwork.new_acquisition_label || artwork.publication_label">
            Description
        </h3>
        <b-card v-if="artwork.exhibition_label" title="Exhibition Label" class="description exhibition-description">
            <p class="card-text" v-html="artwork.exhibition_label"></p>
        </b-card>
        <b-card v-if="artwork.gallery_label" title="Gallery Label" class="description gallery-description">
            <p class="card-text" v-html="artwork.gallery_label"></p>
        </b-card>
        <b-card v-if="artwork.luce_center_label" title="Luce Center Label" class="description luce-description">
            <p class="card-text" v-html="artwork.luce_center_label"></p>
        </b-card>
        <b-card v-if="artwork.luce_object_quote" title="Quote" class="description luce-quote">
            <blockquote class="card-text" v-html="artwork.luce_object_quote"></blockquote>
        </b-card>
        <b-card v-if="artwork.new_acquisition_label" title="Acquisition Label" class="description description">
            <p class="card-text" v-html="artwork.new_acquisition_label"></p>
        </b-card>
        <b-card v-if="artwork.publication_label" title="Publication Label" class="description publication-description">
            <p class="card-text" v-html="artwork.publication_label"></p>
        </b-card>

        <div v-if="artwork.artists.length > 0">
            <h3>Artists</h3>
            <div v-for="artist in artwork.artists" :key="artist.id">
                <ArtistCard :artist="artist" class="description"></ArtistCard>
            </div>
        </div>

        <div v-if="loadingNearbyArtworks" class="text-center">
            <p class="loading animate">Loading Nearby Artworks<span>.</span><span>.</span><span>.</span></p>
        </div>
        <div v-if="artwork.nearby_artworks.length > 0" class="nearby">
            <h3>Nearby Artworks</h3>
            <ArtworkList :artworks="artwork.nearby_artworks"></ArtworkList>
        </div>
    </div>
</template>

<script>
    import Artwork from '../models/ArtworkModel';
    import { mapWaitingGetters } from 'vue-wait'
    import axios from 'axios';
    import YoutubePlayer from "@/components/YoutubePlayer.vue";
    import AudioPlayer from "@/components/AudioPlayer.vue";
    import ArtistCard from "@/components/ArtistCard.vue";
    import ArtworkList from "@/components/ArtworkList.vue";

    export default {
        name: 'ArtworkRecord',
        components: {
            AudioPlayer,
            YoutubePlayer,
            ArtistCard,
            ArtworkList
        },
        methods: {
            fetchNearbyArtworks: async function () {
                this.$wait.start('nearby artworks loading');
                await this.$store.dispatch('artwork/updateNearbyArtworks').then(() => {
                    this.$wait.end('nearby artworks loading');
                });
            },
            fetchAudio: async function (id) {
                this.$wait.start('audio loading');
                await this.$store.dispatch('artwork/updateAudio', id).then(() => {
                    this.$wait.end('audio loading');
                });
            }
        },
        computed: {
            artwork() {
                return this.$store.state.artwork.artwork
            },
            ...mapWaitingGetters({
                loadingNearbyArtworks: 'nearby artworks loading',
                loadingAudio: 'audio loading',
            })
        },
        watch: {
            artwork: function () {
                let self = this;
                if (this.artwork.nearby_artworks.length == 0) {
                    this.fetchNearbyArtworks();
                }
                if (this.artwork.audio_ids.length !== 0) {
                    _.each(this.artwork.audio_ids, function (id) {
                        self.fetchAudio(id);
                    })
                }
                this.$store.dispatch('recent/add', this.artwork);
            }
        },
        created() {},
        mounted() {},
        destroyed() {}
    }
</script>

<style scoped lang="scss">
    .artwork {
        text-align: left;
        margin: 1rem;
        .ontology ul {
            list-style-type: none;
            padding: 0;
        }
        .description, .media {
            margin: 1rem 0;
        }
    }
</style>
