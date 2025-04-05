<script setup>
import SiteHeader from '@/components/SiteHeader.vue';
import { useAnimStore } from '@/stores/animStore';
import { ref, reactive } from 'vue';
import anime from 'animejs';



const numList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13']
const animStore = useAnimStore()
// init null list same size as numList
const animatingCards = reactive(numList.map(() => null))

const container = ref(null)
const isDragging = ref(false)
const startX = ref(0)
const dragX = ref(0)
const dragStartTime = ref(0)

const isHeaderAnimating = ref(false)

const showc = ref(null)

// #region Drag to scroll
const startDrag = (e) => {
    isDragging.value = true
    startX.value = e.pageX
    dragX.value = container.value.scrollLeft
    dragStartTime.value = Date.now()

    document.body.style.cursor = 'grabbing'
}

const endDrag = () => {
    isDragging.value = false
    document.body.style.cursor = 'default'
}

const moveDrag = (e) => {
    if (isDragging.value) {
        e.preventDefault()
        container.value.scrollLeft = dragX.value - (e.pageX - startX.value)
    }
}
// #endregion

const handleWheel = (e) => {
    e.preventDefault()
    const diff = container.value.scrollLeft + e.deltaY * 2
    anime({
        targets: container.value,
        scrollLeft: diff,
        duration: 100,
        easing: 'easeOutQuad'
    })
}

const clickCard = (e) => {
    console.log("Clicked", e.target.getAttribute('data-index'))
    if (!isHeaderAnimating.value) {
        showAnimHeader(true)
    }
    anime({
        targets: e.target,
        rotate: 360,
        duration: 2000,
        easing: 'easeOutExpo',
        complete: () => {
            e.target.rotation = 0

        }
    })
}

const showAnimHeader = (dir) => {
    isHeaderAnimating.value = true;

    anime({
        targets: showc.value,
        height: dir ? "30vh" : "0",
        easing: dir ? "easeOutQuad" : "easeInQuad",
        duration: dir ? 500 : 300,
        complete: () => {
            isHeaderAnimating.value = false
        }
    })

}

const animCard = (e, isUp) => {
    const card = e.target
    const cardIndex = parseInt(card.getAttribute('data-index'))


    anime.remove(card)

    const animation = isUp ? animStore.raiseCard(card, 100)
        : animStore.lowerCard(card)

    if (!isUp && !isHeaderAnimating.value) {
        showAnimHeader(false)
    }


    animation.finished.then(() => {
        if (isUp) {
            animStore.cardRotateBreathe(card, 5)
        } else {
            animStore.lowerCard(card)
        }
    })

}


</script>

<template>
    <header class="site-header">
        <SiteHeader />
    </header>
    <div class="anim-header" ref="showc">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=9JFkdro8Hl-boQqJ"
            title="YouTube video player" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>
    <div class="container" ref="container" @mousedown="startDrag" @mousemove="moveDrag" @mouseup="endDrag"
        @mouseleave="endDrag" @wheel="handleWheel">
        <div v-for="(num, index) in numList" class="num-card" :key="index" :data-index="index"
            @mouseenter="(e) => animCard(e, true)" @mouseleave="(e) => animCard(e, false)" @click="clickCard">
            {{ num }}
        </div>
    </div>
</template>

<style>
@media (min-width: 1024px) {
    .anim-header {
        height: 0;
        align-items: center;
        margin: 0 auto;
        overflow-y: clip;
    }
}

.container {
    display: flex;
    margin: 0 auto;
    border: 1px dashed;
    overflow-x: auto;
    overflow-y: visible;
    scrollbar-width: none;
    padding-top: 100px;
}

.num-card {
    min-width: 220px;
    aspect-ratio: 11 / 20;
    border: solid;
    border-color: black;
    display: flex;
    align-content: flex-end;
    justify-content: center;
    font-size: 30px;
    margin: 5px;
}

.num-card:hover {
    border: 8px solid var(--pp-lightred);
    cursor: pointer;
}
</style>