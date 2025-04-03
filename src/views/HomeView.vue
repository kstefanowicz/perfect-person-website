<script setup>
import { ref } from 'vue'
import PodcastEp from '../components/PodcastEp.vue'
import SiteHeader from '../components/SiteHeader.vue'
import ShowcaseContainer from '@/components/ShowcaseContainer.vue'
import { useSelectionStore } from '@/stores/selectionStore'
import { useAnimStore } from '@/stores/animStore'

const selectionStore = useSelectionStore()
const animStore = useAnimStore()

const showcaseContainer = ref(null)

const podCardWidth = ref('300px')
const podCardHeight = ref('200px')

function handleCardClick(id) {

  const prevId = selectionStore.selectedId

  const cards = document.querySelectorAll('.podcast-card')

  const prevSelectedCard = document.querySelector(`.podcast-card[data-id="${prevId}"]`)
  const newSelectedCard = document.querySelector(`.podcast-card[data-id="${id}"]`)


  // If a previous card exists, lower it
  if (prevId >= 0 && prevSelectedCard) {
    // console.log("LOWERING card with id ", prevId)
    animStore.lowerCard(prevSelectedCard)
  }

  // If unselecting, hide showcase
  if (id === selectionStore.selectedId || id < 0) {
    // console.log("HIDING showcase")
    animStore.hideShowcase(showcaseContainer.value)

    // wait for animation to finish before unselecting
    setTimeout(() => {
      selectionStore.selectCard(id)
    }, 300)
    return
  }

  // Else raise new card and show showcase

  // console.log("RAISING card with id ", id)
  animStore.raiseCard(newSelectedCard, 100)

  // console.log("SHOWING showcase")
  if (!selectionStore.isShowcaseVisible) {
    animStore.showShowcase(showcaseContainer.value)
  }

  selectionStore.selectCard(id)

}

</script>

<template>
  <header class="site-header">
    <SiteHeader />
  </header>
  <main>
    <div v-show="selectionStore.isShowcaseVisible" class="selected-podcast-container" ref="showcaseContainer">
      <ShowcaseContainer v-show="selectionStore.isShowcaseVisible" :key="selectionStore.selectedEpisode?.id"
        :podcast-episode="selectionStore.selectedEpisode" :class="['selected-ep-card']" @close="handleCardClick(-1)" />
    </div>
    <div class="podcast-grid">
      <PodcastEp v-for="episode in selectionStore.episodes" :key="episode.id" :podcast-episode="episode"
        :class="['podcast-card', { 'selected': selectionStore.isSelected(episode.id) }]" :data-id="episode.id"
        @click="handleCardClick(episode.id)" />
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

.podcast-grid {
  display: grid;
  z-index: 1;
  grid-template-columns: repeat(auto-fill, minmax(v-bind(podCardWidth), 1fr));

}
</style>