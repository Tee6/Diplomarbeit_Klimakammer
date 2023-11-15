<template>
    <div class="sidenav" style="margin-top: 100px;">
        <div class="AblaufHeading">
            <h1 style="color: white; padding-top: 0px; margin-top: 15px;margin-bottom: 15px;"> Ablauf </h1>
        </div>
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
    height: 745px;
    width: 400px;
    position: fixed;
    z-index: 0;
    top: 0;
    left: 0;
    background-color: #176c28;
    background-image: radial-gradient(100% 100% at 100% 0, #066d28 10%, #0a4215 100%);
    overflow-x: hidden;
    z-index: 1;
}

.AblaufHeading {
    margin: 0px;
    border-bottom: 5px solid #ffffff;
    padding: 0px;
    margin-bottom: 10px;
    -webkit-box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
    box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
}
</style>
