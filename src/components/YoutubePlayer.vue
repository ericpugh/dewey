<template>
    <b-card v-if="media" :title="media.name" class="video">
        <div class="card-text">
            <b-embed v-if="media.provider == 'YouTube'"
                     type="iframe"
                     aspect="16by9"
                     :src="media.media_url.replace('watch?v=', 'embed/')"
                     allowfullscreen>
            </b-embed>
            <!--TODO: strip links from descriptions?-->
            <div v-if="media.description" v-html="media.description.processed" class="description"></div>
        </div>
    </b-card>
</template>

<script>
    export default {
        name: 'YoutubePlayer',
        props: ['media'],
    }
</script>

<style scoped lang="scss">
    .video {
        .description {
            margin: 1rem 0;
        }
    }
</style>