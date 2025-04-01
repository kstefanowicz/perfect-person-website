<script setup>
import SiteHeader from '@/components/SiteHeader.vue';

const numList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

</script>

<template>
    <header class="site-header">
        <SiteHeader />
    </header>
    <div class="anim-header">
        <h1>Playground for animation</h1>
    </div>
    <div class="container">
        <div v-for="num in numList" class="num-card">
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
    width: 110px;
    height: 200px;
    border: solid;
    border-color: black;
    display: flex;
    align-content: flex-end;
    justify-content: center;
    font-size: 30px;
    margin: 10px;
}
</style>