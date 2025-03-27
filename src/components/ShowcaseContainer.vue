<script setup>
import { ref, watchEffect } from 'vue';

const props = defineProps({
    podcastEpisode: Object
})

const showcaseEp = ref(props.podcastEpisode)

watchEffect(() => {
    showcaseEp.value = props.podcastEpisode
})
</script>

<template>
    <div class="showcase-frame">
        <div class="youtube-embed">
        </div>
        <div class="episode-card">
            <h2 class="color-red">{{ showcaseEp?.title }}</h2>
            <p class="podcast-ep-description">{{ showcaseEp?.description }}</p>
            <p class="podcast-ep-length color-blue">{{ showcaseEp?.length }}</p>
        </div>
        <button @click="$emit('close')">Close</button>
    </div>

</template>

<style scoped>
.showcase-frame {

    max-width: 70%px;
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
}
</style>