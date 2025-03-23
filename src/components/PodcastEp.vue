<script setup>
defineProps({
    podcastEpisode: Object
})
</script>

<template>
    <div>
        <h3 class="podcast-ep-title color-blue"><strong>{{ podcastEpisode.title }}</strong></h3>
        <p class="podcast-ep-length color-blue">{{ podcastEpisode.length }}</p>
    </div>

</template>

<style scoped></style>