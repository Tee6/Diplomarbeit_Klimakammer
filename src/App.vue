<template>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <Navbar></Navbar>
  <sidebar :key="Global.ActionList.length"></sidebar>
  <router-view />
</template>

<script lang="ts" setup>
import Navbar from '@/components/NavBar.vue'
import sidebar from '@/components/SideBar.vue'
import { useFeatureStore } from '@/stores/featureStore'
const featureStore = useFeatureStore()
import { useGlobalStore } from './stores/globalStore';
const Global = useGlobalStore()

Global.PopUpType == 'welcome'
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&family=Roboto&display=swap');

#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  overflow: hidden;

  display: grid;
  grid-template-areas:
    "navbar navbar navbar"
    "ablauf func func"
    "ablauf func func";
}

nav {
  grid-area: navbar;
}

.sidenav {
  grid-area: ablauf;
}

button {
  grid-area: func;
}

router-view {
  z-index: 3;
}
</style>
