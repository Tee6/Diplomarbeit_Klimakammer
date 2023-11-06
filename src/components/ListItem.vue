<template>
    <div class="listitem" @click="test(Feat.id)">
        <h2 class="FeatName">{{ Feat.name }}</h2>
        <div>
            <p class="Vals">{{ Feat.value_name }}: {{ Feat.sollvalue }}</p>
            <p class="Vals">Time: +{{ Feat.timeString }}h</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Feature } from '@/objects/Feature';
import { useGlobalStore } from '@/stores/globalStore';
const Global = useGlobalStore()

function test(featID: number) {
    Global.TogglePopup()
    Global.ActionID = featID
    Global.Edittype = 'edit'
}
defineProps<{ Feat: Feature }>()
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
    -webkit-box-shadow: 10px 5px 10px 1px rgba(0, 0, 0, 0.27);
    -moz-box-shadow: 10px 5px 10px 1px rgba(0, 0, 0, 0.27);
    box-shadow: 10px 5px 10px 1px rgba(0, 0, 0, 0.27);
    border: 5px solid #ffffff;
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