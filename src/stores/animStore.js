import { defineStore } from "pinia"
import { ref, nextTick } from "vue"
import anime from 'animejs'

export const useAnimStore = defineStore('anim', () => {

    function raiseCard(card, amount) {
        return anime({
            targets: card,
            translateY: ("-" + amount + "px"),
            easing: 'easeOutExpo',
            duration: 400
        })
    }

    function lowerCard(card) {
        return anime({
            targets: card,
            translateY: '0px',
            rotate: 0,
            easing: 'linear',
            duration: 400
        })
    }

    function cardRotateBreathe(card, amount) {
        return anime({
            targets: card,
            keyframes: [
                { rotate: -amount },
                { rotate: 0 },
                { rotate: amount },
                { rotate: 0 }
            ],
            easing: 'linear',
            duration: 2000,
            loop: true
        })
    }

    function showShowcase(el, dir) {
        if (!el) return

        anime({
            targets: el,
            height: dir ? "30vh" : "0",
            easing: dir ? "easeOutQuad" : "easeInQuad",
            opacity: dir ? [0, 1] : [1, 0],
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

    return { raiseCard, lowerCard, cardRotateBreathe, showShowcase, hideShowcase }
})