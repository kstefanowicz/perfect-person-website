<script setup>
import SiteHeader from '@/components/SiteHeader.vue';
import { useAnimStore } from '@/stores/animStore';
import { ref, reactive } from 'vue';
import anime from 'animejs';



const numList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const animStore = useAnimStore()
// init null list same size as numList
const animatingCards = reactive(numList.map(() => null))

const animCard = (e, isUp) => {
    const card = e.target
    const cardIndex = parseInt(card.getAttribute('data-index'))

    // console.log('Animating card ', cardIndex, isUp, animatingCards[cardIndex])

    /* if (animatingCards[cardIndex]) {
        } */
    anime.remove(card)

    isUp ? animStore.raiseCard(card)
        : animStore.lowerCard(card)

    /* animatingCards[cardIndex] = animation

    animation.finished.then(() => {
        animatingCards[cardIndex] = null
    }) */

}

</script>

<template>
    <header class="site-header">
        <SiteHeader />
    </header>
    <div class="anim-header">
        <h1>Playground for animation</h1>
    </div>
    <div class="container">
        <div v-for="(num, index) in numList" class="num-card" :key="index" :data-index="index"
            @mouseenter="(e) => animCard(e, true)" @mouseleave="(e) => animCard(e, false)">
            {{ num }}
        </div>
    </div>
</template>

<style>
@media (min-width: 1024px) {
    .anim-header {
        min-height: 20vh;
        align-items: center;
        margin: 0 auto
    }
}

.container {
    display: flex;
    margin: 0 auto;
}

.num-card {
    width: 220px;
    height: 400px;
    border: solid;
    border-color: black;
    display: flex;
    align-content: flex-end;
    justify-content: center;
    font-size: 30px;
    margin: 5px;
}
</style>