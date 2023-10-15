<template>
    <button @click="() => activatePopup(actionName)">{{ actionName }}</button>
</template>

<script lang="ts" setup>
/* eslint-disable */
import PopUp from './Popup.vue'
import { defineProps } from 'vue'
import { useFeatureStore } from '../stores/featureStore'
import { useGlobalStore } from '../stores/globalStore'
const featureStore = useFeatureStore()
const Global = useGlobalStore()

function activatePopup(actionName: string) {
    Global.activePopup = actionName
    Global.TogglePopup(actionName)
}

defineProps({ actionName: { type: String, required: true } })
/* eslint-disable */
</script>

<style>
button {
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
</style>