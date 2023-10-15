<template>
    <form>
        <label> {{ val_name + ' ' }} </label>
        <input type="number" placeholder="...">
        <div v-show="Global.PopUpType == 'auto'">
            <label> Time after Start in minutes </label>
            <input type="number" placeholder="...">
        </div>
    </form>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { useFeatureStore } from '../stores/featureStore'
import { useGlobalStore } from '../stores/globalStore'
const featureStore = useFeatureStore()
const Global = useGlobalStore()

let val_name: string

function findFeature() {
    for (const k of featureStore.Features) {
        if (k.name == Global.activePopup) {
            val_name = k.value_name
        }
    }
}
findFeature()
</script>