<template>
    <button class="actionBtn button-29" role="button" @click="() => activatePopup(actionName)">{{ actionName }}</button>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import { useGlobalStore } from '@/stores/globalStore'
const Global = useGlobalStore()

function activatePopup(actionName: string) {
    Global.Edittype = 'add'
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
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    display: inline-flex;
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
    letter-spacing: 1px;
    animation: ActionButtonFadeIn 0.5s ease 0s 1 normal none;
    animation: StatusBoxAnimation 0.5s ease 0s 1 normal none;
}

.button-29:hover {
    transform: translateY(-2px);
}

.button-29:active {
    box-shadow: #219c3a 0 3px 7px inset;
    transform: translateY(2px);
}

@keyframes ActionButtonFadeIn {
    0% {
        opacity: 0;
        transform: scale(0.6);
    }

    100% {
        opacity: 1;
        transform: scale(1);
    }
}
</style>