<template>
    <nav>
        <a class="title">Klimakammer</a> |
        <router-link :class="{ activeTab: Global.PopUpType == 'auto' }" class="navlink button-28" role="button"
            to="/auto">Auto
        </router-link> |
        <router-link :class="{ activeTab: Global.PopUpType == 'manu' }" class="navlink button-28" role="button"
            to="/manu">Manuell</router-link>
    </nav>
</template>
<script lang="ts" setup>
import { useGlobalStore } from '@/stores/globalStore'
const Global = useGlobalStore()

</script>
<style>
router-view {
    z-index: 3;
}

.activeTab {
    font-weight: bold;
}

nav {
    width: 97vw;
    border-style: ridge;
    padding: 10px;
    display: flex;
    align-items: center;
    z-index: 2;
    background-color: white;
}

nav a router-link {
    font-weight: bold;
    color: #000000;
}

nav a.router-link-exact-active {
    color: #000000;
}

.title {
    padding: 10px;
    font-size: 25px;
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
    color: #3B3B3B;
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

.button-28:active {
    transform: translateY(0);
}
</style>
