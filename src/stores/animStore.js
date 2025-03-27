import { defineStore } from "pinia"
import { ref, nextTick } from "vue"
import { useSelectionStore } from './selectionStore'
import anime from 'animejs'

export const useAnimStore = defineStore('anim', () => {

    const selectionStore = useSelectionStore()

    function raiseCard(card) {
        anime({
            targets: card,
            translateY: '-100px',
            easing: 'easeInOutBack',
            duration: 400
        })
    }

    function lowerCard(card) {
        anime({
            targets: card,
            translateY: '0px',
            easing: 'easeInQuad',
            duration: 200
        })
    }

    async function showShowcase() {

        if (!selectionStore.showcaseContainer) return

        selectionStore.isShowcaseVisible = true
        await nextTick()

        console.log("SHOWING - showcaseContainer value = ", selectionStore.showcaseContainer.value)
        anime({
            targets: selectionStore.showcaseContainer.value,
            translateY: [300, 0],
            opacity: [0, 1],
            easing: 'easeInOutBack',
            duration: 300,
            complete: () => {
            }
        })

    }

    function hideShowcase() {

        console.log("HIDING - showcaseContainer value = ", selectionStore.showcaseContainer.value)
        if (!selectionStore.showcaseContainer) return

        anime({
            targets: selectionStore.showcaseContainer.value,
            translateY: [0, 300],
            opacity: [1, 0],
            easing: 'easeInSine',
            duration: 300,
            complete: () => {
                selectionStore.isShowcaseVisible = false
                selectionStore.selectedId = -1
            }
        })

    }

    return { raiseCard, lowerCard, showShowcase, hideShowcase }
})