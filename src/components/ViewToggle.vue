<script setup>
import { useSelectionStore } from '@/stores/selectionStore';

const selectionStore = useSelectionStore()

function toggleView(mode) {
    selectionStore.setViewMode(mode)
}

</script>

<template>

    <div class="view-toggle">
        <button @click="toggleView('grid')"
            :class="['toggle-button', { 'active': selectionStore.viewMode === 'grid' }]">
            Grid
        </button>
        <button @click="toggleView('list')"
            :class="['toggle-button', { 'active': selectionStore.viewMode === 'list' }]">
            List
        </button>
    </div>
</template>

<style scoped>
button {
    min-width: 50px;
    min-height: 30px;
    cursor: pointer;
}

button.active {
    border: 10px var(--pp-darkred)
}
</style>