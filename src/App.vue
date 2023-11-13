<template>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <Navbar></Navbar>
  <sidebar :key="Global.ActionList.length"></sidebar>
  <div class="container">
    <router-view />
  </div>
</template>

<script lang="ts" setup>
import Navbar from '@/components/NavBar.vue'
import sidebar from '@/components/SideBar.vue'
import { useGlobalStore } from './stores/globalStore';
const Global = useGlobalStore()

Global.PopUpType == 'welcome'

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&family=Open+Sans&family=Roboto&display=swap');

#app {
  font-family: 'Open Sans', sans-serif;
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

h1 {
  display: flex;
  justify-content: center;
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

.centertitle {
  display: flex;
  justify-content: left;
  align-items: left;
  margin: 0;
}

.container {
  margin-left: 395px;
  height: 900px;
  width: 1250px;
  margin-top: 80px;
  position: fixed;
  overflow: scroll;
}
</style>
