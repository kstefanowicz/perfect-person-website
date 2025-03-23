<script setup>
defineProps({
    podcastEpisode: Object
})
</script>

<template>
    <div class="showcase-frame" v-if="podcastEpisode != null">
        <div class="youtube-embed">
        </div>
        <div class="episode-card">
            <h2 class="color-red">{{ podcastEpisode.title }}</h2>
            <p class="podcast-ep-description">{{ podcastEpisode.description }}</p>
            <p class="podcast-ep-length color-blue">{{ podcastEpisode.length }}</p>
        </div>
    </div>

</template>

<style scoped>
.showcase-frame {
    width: 80%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.youtube-embed {
    width: 100%;
    max-width: 640px;
    min-height: 150px;
    background: black;
    aspect-ratio: 16 / 9;
}

.episode-card {
    padding: 2em;
    max-width: 310px;
}
</style>