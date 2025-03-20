<script setup>
defineProps({
    title: String,
    description: String,
    length: String
})

</script>

<template>
    <div>
        <h3 class="podcast-ep-title"><strong>{{ title }}</strong></h3>
        <p class="podcast-ep-description">{{ description }}</p>
        <p class="podcast-ep-length">{{ length }}</p>
    </div>

</template>

<style scoped></style>