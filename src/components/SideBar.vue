<template>
    <div class="sidenav">
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
    position: relative;
    height: 760px;
    width: 400px;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #1E1E1E;
    overflow-x: hidden;
    z-index: 1;
    border-radius: 10px;
    margin-top: 98px;
    margin-left: 19px;
}

.AblaufHeading {
    margin: 0px;
    padding: 0px;
    margin-bottom: 10px;
}
</style>
