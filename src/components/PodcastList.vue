<script setup>
import SiteHeader from '@/components/SiteHeader.vue';
import { useAnimStore } from '@/stores/animStore';
import { useSelectionStore } from '@/stores/selectionStore';
import { ref, reactive } from 'vue';
import anime from 'animejs';
import PodcastEp from './PodcastEp.vue';

const props = defineProps({
    handleCardClick: Function
})
const selectionStore = useSelectionStore()
const animStore = useAnimStore()

const container = ref(null)
const isDragging = ref(false)
const startX = ref(0)
const dragX = ref(0)


// #region Drag to scroll
const startDrag = (e) => {
    isDragging.value = true
    startX.value = e.pageX
    dragX.value = container.value.scrollLeft

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

const animCard = (e, isUp) => {
    const card = e.target


    anime.remove(card)

    const animation = isUp ? animStore.raiseCard(card, 10)
        : animStore.lowerCard(card)


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
    <div class="container" ref="container" @mousedown="startDrag" @mousemove="moveDrag" @mouseup="endDrag"
        @mouseleave="endDrag" @wheel="handleWheel">
        <!-- <div v-for="(num, index) in numList" class="num-card" :key="index" :data-index="index"
            @mouseenter="(e) => animCard(e, true)" @mouseleave="(e) => animCard(e, false)" @click="clickCard">
            {{ num }}
        </div> -->
        <PodcastEp v-for="episode in selectionStore.episodes" :key="episode.id" :podcast-episode="episode"
            :class="['podcast-card', { 'selected': selectionStore.isSelected(episode.id) }]" :data-id="episode.id"
            @mouseenter="(e) => animCard(e, true)" @mouseleave="(e) => animCard(e, false)"
            @click="props.handleCardClick(episode.id)" />
    </div>
</template>

<style scoped>
.container {
    display: flex;
    margin: 0 auto;
    border: 1px dashed;
    overflow-x: auto;
    overflow-y: visible;
    scrollbar-width: none;
    padding-top: 10px;
}

.podcast-card {
    aspect-ratio: 11 / 20;
    width: 200px;
    border: solid;
    border-color: black;
    display: block;
    justify-content: center;

    margin: 2px;
}


.podcast-card:hover {
    border: 8px solid var(--pp-lightred);
    cursor: pointer;
}
</style>