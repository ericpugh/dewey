<template>
    <b-card v-if="artist" :title="artist.title" :sub-title="artist.display_date" class="artist">
        <div class="card-text">
            <h5 v-if="artist.luce_artist_biography">Luce Artist Biography</h5>
            <div v-if="artist.luce_artist_biography" v-html="artist.luce_artist_biography" class="bio"></div>
            <h5 v-if="artist.artist_biography">Artist Biography</h5>
            <div v-if="artist.artist_biography" v-html="artist.artist_biography" class="bio"></div>
        </div>
    </b-card>
</template>

<script>
    export default {
        name: 'ArtistCard',
        props: ['artist'],
    }
</script>

<style scoped lang="scss"></style>