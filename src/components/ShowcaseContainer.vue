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
            <iframe :src="showcaseEp?.url" title="YouTube video player" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

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

    width: 80%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: right;
    overflow-y: clip;
    gap: 1em;
}

.showcase-frame button {
    align-self: flex-end;
}

.youtube-embed {
    width: 60%;
    max-width: 640px;
    min-height: 150px;
    background: black;
    aspect-ratio: 16 / 9;
}

@media (max-width: 800px) {
    .showcase-frame {
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
    }

    h2 {
        font-size: 1rem;
    }

    .youtube-embed {
        width: 100%;
    }
}



iframe {
    width: 100%;
    height: 100%
}

.episode-card {}
</style>