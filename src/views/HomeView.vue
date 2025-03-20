<script setup>
import { ref } from 'vue'
import PodcastEp from '../components/PodcastEp.vue'
import { eps } from '../data/podcastData.js'

const podEps = ref(eps)
const selectedIndex = ref(-1)

function selectCard(i) {
  if (i === selectedIndex.value) {
    selectedIndex.value = -1
    return
  }
  selectedIndex.value = i
}

function isSelected(id) {
  return selectedIndex.value === id
}
</script>

<template>
  <header class="site-header">
    <h1>Perfect Person</h1>
    <p>A podcast, with Miles Bonsignore</p>
  </header>
  <main>
    <div class="podcast-grid">
      <PodcastEp v-for="episode in podEps" :key="episode.id" :title="episode.title"
        :class="['podcast-card', { 'selected': isSelected(episode.id) }]" :description="episode.description"
        :length="episode.length" @click="selectCard(episode.id)" />
    </div>
  </main>

</template>

<style scoped>
.site-header {
  display: flex;
  flex-direction: column;
  background-color: rgb(30, 151, 56);
  padding: 40px;
  color: white;
}

.podcast-card {
  padding: 20px;
  width: 400px;
  height: 300px;
  border: 2px solid white;
}

.podcast-card:hover:not(.selected) {
  padding: 18px;
  border: 4px solid lightblue;
  cursor: pointer
}

.selected {
  padding: 16px;
  border: 6px solid rgb(68, 68, 245);
}

.podcast-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));

}
</style>