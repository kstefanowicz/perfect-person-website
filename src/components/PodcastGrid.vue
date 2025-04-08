<script setup>
import { useSelectionStore } from '@/stores/selectionStore'
import { useAnimStore } from '@/stores/animStore'
import { ref } from 'vue'
import PodcastEp from '../components/PodcastEp.vue'

const props = defineProps({
    handleCardClick: Function
})

const selectionStore = useSelectionStore()
const animStore = useAnimStore()

const podCardWidth = ref('200px')
const podCardHeight = ref('150px')

</script>

<template>
    <div class="podcast-grid-container">
        <div class="podcast-grid">
            <PodcastEp v-for="episode in selectionStore.episodes" :key="episode.id" :podcast-episode="episode"
                :class="['podcast-card', { 'selected': selectionStore.isSelected(episode.id) }]" :data-id="episode.id"
                @click="handleCardClick(episode.id)" />
        </div>
    </div>
</template>

<style scoped>
.podcast-grid-container {
    width: 100%;
    height: 100%;
    overflow: auto;
}

.podcast-grid {
    padding-top: 10px;
    display: grid;
    z-index: 1;
    grid-template-columns: repeat(auto-fill, minmax(v-bind(podCardWidth), 1fr));
}


@media (max-width: 800px) {
    .podcast-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

.podcast-card {
    padding: 20px;
    min-width: v-bind(podCardWidth);
    min-height: v-bind(podCardHeight);
    border: 2px solid white;
}

.podcast-card:hover:not(.selected) {
    padding: 18px;
    border: 4px solid var(--pp-lightred);
    border-radius: .5em;
    cursor: pointer
}

.selected {
    padding: 16px;
    border: 6px solid var(--pp-red);
    border-radius: .5em;
    cursor: pointer
}
</style>