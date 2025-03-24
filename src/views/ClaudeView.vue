<script setup>
import { computed, ref } from 'vue'
import PodcastEp from '../components/PodcastEp.vue'
import SiteHeader from '../components/SiteHeader.vue'
import { eps } from '../data/podcastData.js'
import ShowcaseContainer from '@/components/ShowcaseContainer.vue'
import anime from 'animejs'

const podEps = ref(eps)
const selectedIndex = ref(-1)

const podCardWidth = ref('300px')
const podCardHeight = ref('200px')
const compactCardWidth = ref('250px')
const compactCardHeight = ref('120px')
const isShowcaseActive = ref(false)

const selectedEpisode = computed(() => {
    if (selectedIndex < 0) return null
    return podEps.value.find(ep => ep.id == selectedIndex.value)
})



function openShowcase(selectedId) {
    // First, capture the current position of all cards
    const cards = document.querySelectorAll('.podcast-card');
    const selectedCard = document.querySelector(`.podcast-card[data-id="${selectedId}"]`);

    // Store original positions before any changes
    const originalPositions = [];
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        originalPositions.push({
            el: card,
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height
        });
    });

    // Create the horizontal container
    const container = document.querySelector('.podcast-grid');
    container.style.height = `${selectedCard.offsetHeight}px`;

    // Position for horizontal row (at bottom of viewport)
    const bottomRowY = window.innerHeight - compactCardHeight.value.replace('px', '') - 20;

    // Animate each card to its new position
    cards.forEach((card, i) => {
        const original = originalPositions[i];

        // Calculate target x position in the row
        const targetX = 20 + (i * (parseInt(compactCardWidth.value) + 20));

        // Different animation for selected vs non-selected cards
        if (card === selectedCard) {
            // Set up the showcase holder position
            anime({
                targets: card,
                translateX: [0, targetX - original.left],
                translateY: [0, bottomRowY - original.top],
                width: [original.width, compactCardWidth.value],
                height: [original.height, compactCardHeight.value],
                scale: [1, 1.05],  // Slightly larger for emphasis
                duration: 600,
                easing: 'easeOutQuad'
            });
        } else {
            // Animate other cards to the row
            anime({
                targets: card,
                translateX: [0, targetX - original.left],
                translateY: [0, bottomRowY - original.top],
                width: [original.width, compactCardWidth.value],
                height: [original.height, compactCardHeight.value],
                duration: 600,
                delay: 100 + (i * 50),  // Stagger for a card-by-card effect
                easing: 'easeOutQuad'
            });
        }
    });

    // After cards have moved, show the showcase panel
    setTimeout(() => {
        // Now reveal your showcase panel with another animation
        anime({
            targets: '.showcase-panel',
            translateY: [100, 0],
            opacity: [0, 1],
            duration: 500,
            easing: 'easeOutQuad'
        });
    }, 700);
}

function selectCard(id) {
    if (id === selectedIndex.value) {
        selectedIndex.value = -1
        return
    }
    selectedIndex.value = id
    openShowcase(id)

    const selectedCard = document.querySelector(`.podcast-card[data-id="${id}"]`);

    if (selectedEpisode >= 0) {
        window.scrollTo({

            top: selectedCard.offsetTop - window.innerHeight * .8,
            behavior: 'smooth'
        })
    }
}

function isSelected(id) {
    return selectedIndex.value === id
}
</script>

<template>
    <header class="site-header">
        <SiteHeader />
    </header>
    <main>
        <div v-if="selectedIndex >= 0" class="selected-podcast-container">
            <ShowcaseContainer :key="selectedEpisode.id" :podcast-episode="selectedEpisode"
                :class="['selected-ep-card']" @close="selectCard(-1)" />
        </div>
        <div class="podcast-grid">
            <PodcastEp v-for="episode in podEps" :key="episode.id" :podcast-episode="episode"
                :class="['podcast-card', { 'selected': isSelected(episode.id) }]" :data-id="episode.id"
                @click="selectCard(episode.id)" />
        </div>
    </main>

</template>

<style scoped>
main {
    align-items: center;
    margin: 0 auto;
    padding-left: 5em;
    padding-right: 4em;
}

.selected-ep-card {
    margin: 0 auto;
    padding: 2px 2em;
    background-color: white;
    border: .5em;
    border-style: solid;
    border-radius: 0.5em;
    border-color: var(--pp-darkred);
}

.site-header {
    display: flex;
    flex-direction: column;
    padding: 40px;
    color: white;
    display: block;
    padding: 0 auto
}

.podcast-card {
    padding: 20px;
    width: v-bind(podCardWidth);
    height: v-bind(podCardHeight);
    border: 2px solid white;
}

.podcast-card:hover:not(.selected) {
    padding: 18px;
    border: 4px solid var(--pp-lightred);
    border-radius: .5em;
    cursor: pointer
}

.selected-podcast-container {
    display: flex;
    align-items: center;

}

.selected {
    padding: 16px;
    border: 6px solid var(--pp-red);
    border-radius: .5em;
    cursor: pointer
}

.podcast-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(v-bind(podCardWidth), 1fr));

}
</style>