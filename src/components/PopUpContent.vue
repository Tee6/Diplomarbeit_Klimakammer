<template>
    <form>
        <label> {{ val_name + ' ' }} </label>
        <input type="number" placeholder="...">
        <div v-show="Global.PopUpType == 'auto'">
            <label> Time after Start in minutes </label>
            <input id="test" type="number" placeholder="...">
        </div>
    </form>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { useFeatureStore } from '@/stores/featureStore'
import { useGlobalStore } from '@/stores/globalStore'
const featureStore = useFeatureStore()
const Global = useGlobalStore()

let val_name: string

function addMinSuffix(input: any) {
    console.log(input)
    const value = input.value.trim();
    if (value !== '') {
        input.value = value + ' min';
    }
}


function findFeature() {
    for (const k of featureStore.Features) {
        if (k.name == Global.activePopup) {
            val_name = k.value_name
        }
    }
}
findFeature()
</script>

<style>
input[type="number"] {
    text-align: center;
    width: 90%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    color: #333;
}

/* Style the input field placeholder text */
input[type="number"]::placeholder {
    color: #999;
}

/* Style the input field on hover */
input[type="number"]:hover {
    border-color: #555;
}

/* Style the input field on focus (when clicked) */
input[type="number"]:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    outline: none;
    /* Remove the default focus outline */
}
</style>