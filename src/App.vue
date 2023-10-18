<template>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <Navbar></Navbar>
  <sidebar></sidebar>
  <router-view />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Navbar from '@/components/NavBar.vue'
import sidebar from '@/components/SideBar.vue'
import { useFeatureStore } from '@/stores/featureStore'
import { useGlobalStore } from './stores/globalStore';
const featureStore = useFeatureStore()
const Global = useGlobalStore()

Global.PopUpType == 'welcome'
</script>

<style>
#app {
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

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
