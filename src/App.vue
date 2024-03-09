<template>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Klimakammer Steuerung</title>
  <link rel="icon" href="https://icon-library.com/images/google-weather-icon/google-weather-icon-8.jpg">
  <link rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
  <div id="app">
    <Navbar></Navbar>
  </div>
  <sidebar :key="Global.ActionList.length"></sidebar>
  <div class="container">
    <router-view /> <!-- Displays Chosen View -->
  </div>
  <TxtToSpeechButton></TxtToSpeechButton>
</template>

<script lang="ts" setup>

// Imports Components
import TxtToSpeechButton from '@/components/TxtToSpeechButton.vue';
import Navbar from '@/components/NavBar.vue'
import sidebar from '@/components/SideBar.vue'

// Imports Stores
import { useReglerStore } from './stores/CtrlLoopStore';
import { useGlobalStore } from './stores/globalStore';
const Global = useGlobalStore()
const ReglerStore = useReglerStore()

ReglerStore.getKammerValues() // Get initial Sensor Values

Global.PopUpType == 'welcome' // Current View Variable to welcome
Global.httpGet(Global.APIStart + Global.APIkey) // Initialize API Connection to OpenweatherMap
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&family=Open+Sans&family=Roboto&display=swap');

html {
  background-color: #424242;

  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#logo {
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #151515;
  border-radius: 10px;
  justify-content: center;
  color: #FFFFFF;
  margin-top: 0px;
  padding: 10px;
}

#app {
  border-radius: 10px;
  text-align: center;
  justify-content: space-between;
  overflow: hidden;
  width: 100%;
  display: flex;
}

h1 {
  display: flex;
  justify-content: center;
  color: #FFFFFF;
}

nav {
  grid-area: navbar;
  margin-left: 10px;
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
  margin-top: 90px;
  margin-left: 420px;
  margin-bottom: 20px;
  border-radius: 10px;
  height: 740px;
  width: 1230px;
  position: fixed;
  overflow: scroll;
  background-color: #212121;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

input[type=number],
select {
  width: auto;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
</style>
