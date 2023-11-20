<template>
    <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
    <div class="listitem" @click="test(Feat?.id)">
        <span class="material-symbols-outlined">
            {{ ico?.iconLink }}
        </span>
        <h2 class="FeatName">{{ Feat?.name }}</h2>
        <div>
            <p class="Vals">{{ Feat?.value_name }}: {{ Feat?.sollvalue }}%</p>
            <p class="Vals">Time: +{{ Feat?.timeString }}h</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Action } from '@/objects/Feature';
import { useGlobalStore } from '@/stores/globalStore';
const Global = useGlobalStore()

import { useFeatureStore } from '@/stores/featureStore';
const FeatureStore = useFeatureStore()

function test(featID = 0) {
    if (Global.PopUpType == 'auto') {
        Global.TogglePopup()
        Global.ActionID = featID
        Global.Edittype = 'edit'
    }
}
const props = defineProps<{ Feat?: Action }>()

const ico = FeatureStore.Features.find(obj => obj.name == props.Feat?.name)
</script>

<style scoped>
@keyframes FadeIn {
    0% {
        opacity: 0;
        transform: translateX(-50px);
    }

    100% {
        opacity: 1;
        transform: translateX(0);
    }
}

.listitem {
    animation: FadeIn 1s ease 0s 1 normal forwards;
    border-radius: 10px;
    margin-bottom: 11px;
    margin-left: 10px;
    margin-right: 10px;
    padding-left: 10px;
    padding-right: 10px;
    color: white;
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;

    background-color: #236326;
}

.FeatName {
    font-size: 20px;
    font-weight: bold;
    text-align: left;
}

.Vals {
    text-align: right;
}

body {
    margin-top: 130px;
}
</style>