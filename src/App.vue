<template>
  <Navbar></Navbar>
  <sidebar></sidebar>
  <router-view />
</template>

<script lang="ts" setup>
import Navbar from './components/NavBar.vue'
import sidebar from './components/SideBar.vue'
import { useFeatureStore } from './stores/featureStore'
const featureStore = useFeatureStore()
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
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
