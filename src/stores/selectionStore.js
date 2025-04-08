import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useFirebaseStore } from './firebaseStore.js'

export const useSelectionStore = defineStore('selection', () => {

  const firebaseStore = useFirebaseStore()

  const episodes = computed(() => firebaseStore.episodesAll)
  const selectedId = ref(-1)
  const isShowcaseVisible = ref(false)

  const viewMode = ref('grid')
  const setViewMode = (mode) => {
    viewMode.value = mode
  }

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

    // console.log("Selecting card with id ", id)

    if (id === selectedId.value || id < 0) {
      selectedId.value = -1
      isShowcaseVisible.value = false
      return
    }

    // Else select new
    selectedId.value = id
    isShowcaseVisible.value = true

  }

  return { episodes, setViewMode, selectedId, isShowcaseVisible, viewMode, showcaseContainer, selectedEpisode, isSelected, selectCard }
})
