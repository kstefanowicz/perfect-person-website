<script setup>
import { computed } from 'vue'
const props = defineProps({
    podcastEpisode: Object
})

//console.log(props.podcastEpisode.thumbnail)

const thumbnails = computed(() => {
    if (Array.isArray(props.podcastEpisode.thumbnail)) {
        return props.podcastEpisode.thumbnail
    }

    try {
        var out = JSON.parse(props.podcastEpisode.thumbnail)
        console.log("OUT - " + out[1].url)
        return out
    } catch (e) {
        console.error(e)
        return []
    }
})

</script>

<template>
    <div>
        <div v-if="podcastEpisode && podcastEpisode.thumbnail">
            <img :src="thumbnails[2]?.url" />
        </div>
        <h5 class="podcast-ep-title color-blue"><strong>{{ podcastEpisode.title }}</strong></h5>
        <p class="podcast-ep-length color-blue">{{ podcastEpisode.length }}</p>
    </div>

</template>

<style scoped></style>