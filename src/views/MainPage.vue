<template>
    <h1>Klimakammer Übersicht</h1>
    <div class="overview">
        <div>
            <StatusBox class="StatBox" v-for="a in Features.Features" :-f="a"></StatusBox>
        </div>
        <div>


            <div class="box" style="margin-left: 42px;margin-right: 42px; height: 100px;">
                <div class="heading">
                    PSU
                </div>
                <div class="content psu">
                    <span class="statustitle">PSU Status:</span>
                    <span class="statustitle">PSU Voltage:</span>
                    <span class="statustitle">PSU Current:</span>
                </div>
            </div>
            <div class="box" style="margin-left: 42px;margin-right: 42px; height: 100px;">
                <div class="heading">
                    Tür
                </div>
                <div class="content psu">
                    <span class="statustitle">Tür Status:</span>
                </div>
            </div>
        </div>
    </div>
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
.psu {
    display: flex;
    flex-direction: column;
    padding: 5px;
}

.misc {
    background-color: white;
}

.overview {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
}

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