import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { eps } from '../data/podcastData.js'
import { useAnimStore } from './animStore.js'
import ShowcaseContainer from '@/components/ShowcaseContainer.vue'

export const useSelectionStore = defineStore('selection', () => {


  const animStore = useAnimStore()

  const episodes = ref(Array.isArray(eps) ? eps : [])
  const selectedId = ref(-1)
  const isShowcaseVisible = ref(false)
  const viewMode = ref('grid')

  const showcaseContainer = ref(null)

  const selectedEpisode = computed(() => {
    if (selectedId.value < 0) return null
    return episodes.value.find(ep => ep.id === selectedId.value)
  })

  const isSelected = (id) => {
    return selectedId.value === id
  }

  // If selected was clicked, unselect and return
  function selectCard(id) {

    console.log("Selecting card with id ", id)
    const prevId = selectedId.value


    const prevSelectedCard = document.querySelector(`.podcast-card[data-id="${prevId}"]`)
    const newSelectedCard = document.querySelector(`.podcast-card[data-id="${id}"]`)
    const cards = document.querySelectorAll('.podcast-card')

    if (prevId >= 0) {
      animStore.lowerCard(prevSelectedCard)
    }

    if (id === selectedId.value || id < 0) {
      animStore.hideShowcase()
      selectedId.value = -1
      return
    }

    // Else select new
    selectedId.value = id
    animStore.raiseCard(newSelectedCard)
    animStore.showShowcase()

  }

  return { episodes, selectedId, isShowcaseVisible, viewMode, showcaseContainer, selectedEpisode, isSelected, selectCard }
})
