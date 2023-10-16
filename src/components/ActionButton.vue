<template>
    <button class="actionBtn button-29" role="button" @click="() => activatePopup(actionName)">{{ actionName }}</button>
</template>

<script lang="ts" setup>
/* eslint-disable */
import PopUp from './Popup.vue'
import { defineProps } from 'vue'
import { useFeatureStore } from '@/stores/featureStore'
import { useGlobalStore } from '@/stores/globalStore'
const featureStore = useFeatureStore()
const Global = useGlobalStore()

function activatePopup(actionName: string) {
    Global.activePopup = actionName
    Global.TogglePopup()
}
defineProps({ actionName: { type: String, required: true } })
/* eslint-disable */
</script>

<style>
.actionBtn {
    margin: 20px;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    text-decoration: none;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
}

.button {
    background-color: #3498db;
    color: #fff;
}

.button:hover {
    background-color: #2980b9;
}

/* CSS */
.button-29 {
    align-items: center;
    appearance: none;
    background-image: radial-gradient(100% 100% at 100% 0, #23a64f 0, #176c28 100%);
    border: 0;
    border-radius: 6px;
    box-shadow: #176c28 0 2px 4px, #176c28 0 7px 13px -3px, #176c28 0 -3px 0 inset;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    display: inline-flex;
    font-family: "JetBrains Mono", monospace;
    height: 48px;
    justify-content: center;
    line-height: 1;
    list-style: none;
    overflow: hidden;
    padding-left: 16px;
    padding-right: 16px;
    position: relative;
    text-align: left;
    text-decoration: none;
    transition: box-shadow .15s, transform .15s;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    white-space: nowrap;
    will-change: box-shadow, transform;
    font-size: 18px;
    width: 10em;
}

.button-29:focus {
    box-shadow: #176c28 0 0 0 1.5px inset, #176c28 0 2px 4px, #176c28 0 7px 13px -3px, #176c28 0 -3px 0 inset;
}

.button-29:hover {
    box-shadow: #176c28 0 4px 8px, #176c28 0 7px 13px -3px, #176c28 0 -3px 0 inset;
    transform: translateY(-2px);
}

.button-29:active {
    box-shadow: #219c3a 0 3px 7px inset;
    transform: translateY(2px);
}
</style>