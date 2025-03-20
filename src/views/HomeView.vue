<script setup>
import { ref } from 'vue'
import PodcastEp from '../components/PodcastEp.vue'
import { eps } from '../data/podcastData.js'

const podEps = ref(eps)
</script>

<template>
  <header class="site-header">
    <h1>Perfect Person</h1>
    <p>A podcast, with Miles Bonsignore</p>
  </header>
  <main>
    <div class="podcast-grid">
      <PodcastEp v-for="episode in podEps" :key="episode.id" :title="episode.title" :description="episode.description"
        :length="episode.length" />
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

.podcast-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));

}
</style>