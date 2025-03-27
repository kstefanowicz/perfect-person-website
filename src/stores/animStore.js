import { defineStore } from "pinia"
import { ref, nextTick } from "vue"
import anime from 'animejs'

export const useAnimStore = defineStore('anim', () => {

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

    function showShowcase(el) {
        if (!el) return

        anime({
            targets: el,
            translateY: [300, 0],
            opacity: [0, 1],
            easing: 'easeInOutBack',
            duration: 500
        })

    }

    function hideShowcase(el) {
        if (!el) {
            console.log("Showcase not found!!")
            return

        }
        anime({
            targets: el,
            translateY: [0, 300],
            opacity: [1, 0],
            easing: 'easeInSine',
            duration: 300
        })

    }

    return { raiseCard, lowerCard, showShowcase, hideShowcase }
})