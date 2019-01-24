<template>
    <div class="audio">
        <audio v-if="this.file" :src="this.file" :title="this.title" class="autoload" controls width="100%" height="80px" style="width:100%; height: 80px;" preload="none">
            Your browser does not support the <code>audio</code> element.
        </audio>
        <!--TODO: create a "docked" audio player, that sets audio when a link is clicked.-->
        <!--<div class="audio-player docked fixed-bottom bg-light">Player</div>-->
    </div>

</template>

<script>
    export default {
        name: 'AudioPlayer',
        props: [
            'file',
            'title'
        ],
    }
</script>

<style scoped lang="scss">
    .audio {
        .audio-player {
        }
    }
</style>