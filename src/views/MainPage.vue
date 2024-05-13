<template>
    <div class="mainheading">
        <h1>Klimakammer Übersicht</h1>
        <p v-if="Global.StartTime > 0">Starttime: {{ Global.timestampZuDatumUhrzeit(Global.StartTime) }}</p>
        <button @click="deleteRoutine" class="button-29" style="font-size: 13px; height: 25px;"> Routine
            Löschen</button>
    </div>
    <div class="overview">
        <div>
            <StatusBox class="StatBox" v-for="a in Features.Features" :-f="a">
            </StatusBox>
        </div>
        <div>


            <div class="box" style="margin-left: 42px;margin-right: 42px; height: 100px;">
                <div class="heading misc-boxHeading">
                    PSU
                </div>
                <div class="content psu">
                    <span class="statustitle">PSU Voltage: {{ ReglerStore.CurrentStatus.get('PSUvolt') }}</span>
                    <span class="statustitle">PSU Current: {{ ReglerStore.CurrentStatus.get('PSUvolt') }}</span>
                </div>
            </div>
            <div class="box" style="margin-left: 42px;margin-right: 42px; height: 100px;">
                <div class="heading misc-boxHeading">
                    Tür
                </div>
                <div class="content psu">
                    <span class="statustitle">Tür Status: {{ DoorStatus() }}</span> <!-- Maybe Töten -->
                </div>
            </div>
            <div class="box" style="margin-left: 42px;margin-right: 42px;">
                <div class="heading misc-boxHeading">
                    <a :href=useReglerStore().CamIP target="_blank" style="all: unset; cursor: pointer;">Kamera</a>
                </div>
                <div class="content psu">
                    <CameraStream></CameraStream>
                </div>
            </div>
        </div>
    </div>
    <PopUp :action-name="Global.activePopup" v-if="Global.showPopup">
    </PopUp>
</template>

<script lang="ts" setup>
import PopUp from '@/components/Popup.vue'
import { useChartStore } from '@/stores/ChartStore';
import StatusBox from '@/components/StatusBox.vue'
import CameraStream from '@/components/CameraStream.vue';
import { useGlobalStore } from '@/stores/globalStore';
const Global = useGlobalStore()
import { useFeatureStore } from '@/stores/featureStore';
const Features = useFeatureStore()
import { useReglerStore } from '@/stores/CtrlLoopStore';
const ReglerStore = useReglerStore()

Global.PopUpType = 'main'
Features.Fill()

function DoorStatus() {
    if (ReglerStore.CurrentStatus.get('Tuer') > 1) {
        return 'Offen'
    }
}

function deleteRoutine() {
    Global.ActionList = []
    Global.save()
}
</script>

<style>
.mainheading {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-left: 42px;
    margin-right: 42px;
    margin-top: 20px;
    align-items: center;

    color: #FFFFFF;
}

.misc-boxHeading {
    padding-right: 300px;
}

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