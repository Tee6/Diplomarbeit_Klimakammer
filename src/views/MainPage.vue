<template>
    <h1>Klimakammer Übersicht</h1>
    <StatusBox class="StatBox" v-for="a in Features.Features" :-f="a"></StatusBox>
    <PopUp :action-name="Global.activePopup" v-if="Global.showPopup">
    </PopUp>
</template>

<script lang="ts" setup>
import PopUp from '@/components/Popup.vue'
import StatusBox from '@/components/StatusBox.vue'
import { useGlobalStore } from '@/stores/globalStore';
const Global = useGlobalStore()
import { useFeatureStore } from '@/stores/featureStore';
const Features = useFeatureStore()

Global.PopUpType = 'main'
Features.Fill()
</script>

<style>
.StatBox {
    margin-left: 20px;
    animation: StatusBoxAnimation 0.5s ease 0s 1 normal none;
}

@keyframes StatusBoxAnimation {
    0% {
        opacity: 0;
        transform: translateY(50px);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>