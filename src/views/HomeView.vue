<script setup>
import { ref } from 'vue'
import PodcastEp from '../components/PodcastEp.vue'
import SiteHeader from '../components/SiteHeader.vue'
import ShowcaseContainer from '@/components/ShowcaseContainer.vue'
import { useSelectionStore } from '@/stores/selectionStore'

const selectionStore = useSelectionStore()

const podCardWidth = ref('300px')
const podCardHeight = ref('200px')

</script>

<template>
  <header class="site-header">
    <SiteHeader />
  </header>
  <main>
    <div v-show="selectionStore.isShowcaseVisible" class="selected-podcast-container" ref="showcaseContainer">
      <ShowcaseContainer v-show="selectionStore.isShowcaseVisible" :key="selectionStore.selectedEpisode?.id"
        :podcast-episode="selectionStore.selectedEpisode" :class="['selected-ep-card']"
        @close="selectionStore.selectCard(-1)" />
    </div>
    <div class="podcast-grid">
      <PodcastEp v-for="episode in selectionStore.episodes" :key="episode.id" :podcast-episode="episode"
        :class="['podcast-card', { 'selected': selectionStore.isSelected(episode.id) }]" :data-id="episode.id"
        @click="selectionStore.selectCard(episode.id)" />
    </div>
  </main>

</template>

<style scoped>
main {
  align-items: center;
  margin: 0 auto;
  padding-left: 5em;
  padding-right: 4em;
}

.selected-ep-card {
  margin: 0 auto;
  padding: 2px 2em;
  background-color: white;
  border: .5em;
  border-style: solid;
  border-radius: 0.5em;
  border-color: var(--pp-darkred);
}

.site-header {
  display: flex;
  flex-direction: column;
  padding: 40px;
  color: white;
  display: block;
  padding: 0 auto
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
  z-index: 10;
  align-items: center;
  min-height: 400px;
}

.selected {
  padding: 16px;
  border: 6px solid var(--pp-red);
  border-radius: .5em;
  cursor: pointer
}

.podcast-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(v-bind(podCardWidth), 1fr));

}
</style>