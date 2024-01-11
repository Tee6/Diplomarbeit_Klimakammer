<template>
    <div class="sidenav">
        <div class="AblaufHeading">
            <h1 style="margin: 0;"> Ablauf </h1>
            <button class="actionBtn button-3" style="margin: 0px;" role="button" v-if="Global.Changed == 'true'"
                @click="Global.save()">Anwenden
                und
                Speichern*</button>
            <button class="actionBtn button-3" style="margin: 0px;" role="button" v-if="Global.Changed == 'false'">Anwenden
                und
                Speichern</button>
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
    height: 740px;
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
    scroll-behavior: smooth;
}

.AblaufHeading {
    margin: 0px;
    padding: 0px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    padding-top: 10px;
    width: 101%;
}

/* CSS */
.button-3 {
    appearance: none;
    background-color: #076802;
    border: 1px solid rgba(27, 31, 35, .15);
    border-radius: 6px;
    box-shadow: rgba(27, 31, 35, .1) 0 1px 0;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    font-family: -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    padding: 6px 16px;
    position: relative;
    text-align: center;
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: middle;
    white-space: nowrap;
}

.button-3:focus:not(:focus-visible):not(.focus-visible) {
    box-shadow: none;
    outline: none;
}

.button-3:hover {
    background-color: #2c974b;
}

.button-3:focus {
    box-shadow: rgba(46, 164, 79, .4) 0 0 0 3px;
    outline: none;
}

.button-3:disabled {
    background-color: #94d3a2;
    border-color: rgba(27, 31, 35, .1);
    color: rgba(255, 255, 255, .8);
    cursor: default;
}

.button-3:active {
    background-color: #298e46;
    box-shadow: rgba(20, 70, 32, .2) 0 1px 0 inset;
}
</style>
