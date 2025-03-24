<script setup>
import { computed, ref } from 'vue'
import PodcastEp from '../components/PodcastEp.vue'
import SiteHeader from '../components/SiteHeader.vue'
import { eps } from '../data/podcastData.js'
import ShowcaseContainer from '@/components/ShowcaseContainer.vue'
import anime from 'animejs'

const podEps = ref(eps)
const selectedIndex = ref(-1)

const showcaseContainer = ref(null)

const podCardWidth = ref('300px')
const podCardHeight = ref('200px')

const selectedEpisode = computed(() => {
  if (selectedIndex < 0) return null
  return podEps.value.find(ep => ep.id == selectedIndex.value)
})

function selectCard(id) {
  const prevSelectedCard = document.querySelector(`.podcast-card[data-id="${selectedIndex.value}"]`)
  const newSelectedCard = document.querySelector(`.podcast-card[data-id="${id}"]`)
  const cards = document.querySelectorAll('.podcast-card')

  // Lower the previous selection
  if (selectedIndex.value >= 0) {
    anime({
      targets: prevSelectedCard,
      translateY: '0px',
      easing: 'easeInQuad',
      duration: 200
    })
  }

  // If selected was clicked, unselect and return
  if (id === selectedIndex.value) {
    selectedIndex.value = -1
    return
  }

  // Else select new 
  selectedIndex.value = id

  // Raise the new selection
  anime({
    targets: newSelectedCard,
    translateY: '-100px',
    easing: 'easeInOutBack',
    duration: 400
  })
}

function isSelected(id) {
  return selectedIndex.value === id
}
</script>

<template>
  <header class="site-header">
    <SiteHeader />
  </header>
  <main>
    <div v-if="selectedIndex >= 0" class="selected-podcast-container" ref="showcase-container">
      <ShowcaseContainer :key="selectedEpisode.id" :podcast-episode="selectedEpisode" :class="['selected-ep-card']"
        @close="selectCard(-1)" />
    </div>
    <div class="podcast-grid">
      <PodcastEp v-for="episode in podEps" :key="episode.id" :podcast-episode="episode"
        :class="['podcast-card', { 'selected': isSelected(episode.id) }]" :data-id="episode.id"
        @click="selectCard(episode.id)" />
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
  align-items: center;
  min-height: 400px
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