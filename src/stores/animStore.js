import { defineStore } from "pinia"
import { ref, nextTick } from "vue"
import anime from 'animejs'

export const useAnimStore = defineStore('anim', () => {

    function raiseCard(card) {
        return anime({
            targets: card,
            translateY: '-100px',
            easing: 'easeOutExpo',
            duration: 400
        })
    }

    function lowerCard(card) {
        return anime({
            targets: card,
            translateY: '0px',
            easing: 'linear',
            duration: 400
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