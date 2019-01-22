<template>
    <ul v-if="artworks.length" class="list-group">
        <li v-for="artwork in artworks" :key="artwork.id" class="list-group-item">
            {{ artwork.title }}
        </li>
    </ul>
</template>

<script>
    export default {
        name: 'ArtworkList',
        data: function () {
            return {
                artworks: [],
            }
        }
    }
</script>

<style scoped lang="scss">

</style>