<script setup>
import anime from 'animejs'
import { onMounted, ref } from 'vue'
import { titlePaths } from '../assets/svg/titlePath.js'

const animTimer = Math.floor(Math.random() * 500 + 1600)

const isPathVisible = ref(false)

onMounted(() => {
    isPathVisible.value = false;

    setTimeout(() => {

        isPathVisible.value = true;
        // Run the animation once all setup is done
        anime({
            targets: '.title-paths path',
            strokeDashoffset: [anime.setDashoffset, 0],
            easing: 'easeOutQuad',
            duration: animTimer,
            // Logo .svg has five paths - delay each one to start in sequence
            delay: function (el, i) { return i * 300 },
            direction: 'normal',
            loop: false,
        })
    }, 200)
})

</script>

<template>
    <div class="title-header">
        <svg class="title-svg" viewBox="0 0 600 150" xmlns="http://www.w3.org/2000/svg">
            <g class="title-paths" transform="translate(-50,0) scale(4.5)" v-show="isPathVisible">
                <path v-for="(path, i) in titlePaths" :key="i" :d="path" />
            </g>
        </svg>
        <p>A flawless call in advice show about being perfect. Hosted by <strong class="highlight">Miles
                Bonsignore</strong>
        </p>
    </div>
</template>

<style scoped>
.title-paths path {
    fill: none;
    stroke: var(--pp-red);
    stroke-width: 3;
    stroke-linecap: square;
    stroke-linejoin: bevel;
}

.title-header {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.title-svg {
    width: 80%;
    height: 8em;
    margin-bottom: 2em;
}

.highlight {
    color: var(--pp-red)
}

h1 {
    color: var(--pp-red)
}

p {
    color: var(--pp-blue)
}
</style>