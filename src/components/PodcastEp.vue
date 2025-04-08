<script setup>
import { computed } from 'vue'
const props = defineProps({
    podcastEpisode: Object
})

</script>

<template>
    <div>
        <div v-if="podcastEpisode && podcastEpisode.thumbnail">
            <img :src="podcastEpisode.thumbnail[2]?.url" />
        </div>
        <h3 class="podcast-ep-title color-blue"><strong>{{ podcastEpisode.title }}</strong></h3>
        <p class="podcast-ep-length color-red">{{ podcastEpisode.length }}</p>
    </div>

</template>

<style scoped></style>