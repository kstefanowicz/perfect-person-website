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

const podCardWidth = ref('300px')
const podCardHeight = ref('200px')

</script>

<template>
    <div class="podcast-grid">
        <PodcastEp v-for="episode in selectionStore.episodes" :key="episode.id" :podcast-episode="episode"
            :class="['podcast-card', { 'selected': selectionStore.isSelected(episode.id) }]" :data-id="episode.id"
            @click="handleCardClick(episode.id)" />
    </div>
</template>

<style scoped>
.podcast-grid {
    display: grid;
    z-index: 1;
    grid-template-columns: repeat(auto-fill, minmax(v-bind(podCardWidth), 1fr));

}

.podcast-card {
    padding: 20px;
    width: v-bind(podCardWidth);
    height: v-bind(podCardHeight);
    border: 2px solid white;
}

.podcast-card:hover:not(.selected) {
    padding: 18px;
    border: 4px solid var(--pp-lightred);
    border-radius: .5em;
    cursor: pointer
}

.selected-podcast-container {
    display: flex;
    z-index: v-bind('selectionStore.isShowcaseVisible ? 10 : -1');
    align-items: center;
    min-height: 400px;
}

.selected {
    padding: 16px;
    border: 6px solid var(--pp-red);
    border-radius: .5em;
    cursor: pointer
}
</style>