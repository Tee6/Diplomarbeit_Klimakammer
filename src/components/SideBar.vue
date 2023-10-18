<template>
    <div class="sidenav">
        <ListItem v-for="a of Global.ActionList" :-feature-name="a.name" :-time-value="a.time" :-value-name="a.value">
        </ListItem>
    </div>
</template>
<script setup lang="ts">
import ListItem from './ListItem.vue';
import { useGlobalStore } from '@/stores/globalStore';
const Global = useGlobalStore()
</script>
<style>
.sidenav {
    border: 2px solid #000;
    position: relative;
    height: 100%;
    width: 400px;
    position: fixed;
    z-index: 0;
    top: 0;
    left: 0;
    background-color: #176c28;
    background-image: radial-gradient(100% 100% at 100% 0, #066d28 10%, #0a4215 100%);
    overflow-x: hidden;
    padding-top: 20px;
    z-index: 1;
}
</style>
