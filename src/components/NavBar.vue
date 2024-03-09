<template>
    <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
    <nav>
        <router-link class="navlink button-28 title" to="/main">Klimakammer</router-link>
        <router-link :class="{ activeTab: Global.PopUpType == 'auto' }" class="navlink button-28" role="button"
            to="/auto">Ablauf erstellen
        </router-link>
        <router-link :class="{ activeTab: Global.PopUpType == 'manu' }" class="navlink button-28" role="button"
            to="/manu">Manuell</router-link>
        <router-link :class="{ activeTab: Global.PopUpType == 'liveweather' }" class="navlink button-28" role="button"
            to="/liveweather">LIVE Wetter</router-link>
        <router-link :class="{ activeTab: Global.PopUpType == 'settings' }"
            class="navlink button-28 material-symbols-outlined" role="button" style="padding-top:18px" to="/settings">
            settings
        </router-link>

    </nav>
</template>
<script lang="ts" setup>
import { useGlobalStore } from '@/stores/globalStore'
const Global = useGlobalStore()
</script>
<style>
.material-symbols-outlined {
    align-items: center;
}

router-view {
    z-index: 3;
}

.activeTab {
    font-weight: bold;
}

nav {
    align-items: center;
    padding: 10px;
    padding-left: 200px;
    padding-right: 200px;
    display: flex;
    z-index: 2;
    background-color: #151515;
    border-radius: 10px;
    justify-content: center;
    color: #FFFFFF;
    width: 1239.15px;
}

nav a router-link {
    font-weight: bold;
}

nav a.router-link-exact-active {
    color: #ffffff;
}

.title {
    padding: 10px;
    font-size: 25px;
    font-family: serif;
    text-decoration: none;
    color: #FFFFFF;
    letter-spacing: 2px;
    padding-right: 0px;
}

.navlink {
    padding-left: 20px;
    padding-right: 20px;
}

/* CSS */
.button-28 {
    appearance: none;
    background-color: transparent;
    box-sizing: border-box;
    color: #FFFFFF;
    cursor: pointer;
    font-family: Roobert, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 20px;
    line-height: normal;
    margin: 0;
    min-height: 60px;
    min-width: 0;
    outline: none;
    padding: 16px 24px;
    text-align: center;
    text-decoration: none;
    transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    will-change: transform;
}

.button-28:hover {
    font-weight: bold;
    transform: translateY(-2px);
}

.button-28:active title:active {
    transform: translateY(0);
}
</style>
