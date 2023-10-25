<template>
    <div class="sidenav" style="margin-top: 100px;">
        <ListItem v-if="Global.ActionList.length > 0" v-for="a of Global.ActionList" :-feat="a"
            :key="Global.ActionList.length">
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
