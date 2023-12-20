<template>
    <div style="display: grid;">
        <link rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
        <div class="box Statbox" style="width: 100%;">
            <div class="heading">
                <span class="material-symbols-outlined">
                    {{ F?.iconLink }}
                </span>
                <span class="statustitle">{{ F?.name }}</span>
            </div>
            <div class="content" v-if="Action?.id !== undefined">
                <div style="margin-right: 10px; height: 50px;">
                    Derzeitige Intensität: {{ currentValue }}%
                    <br>
                    Erwartete Intensität: {{ Action?.sollvalue }}%
                </div>
                <LineChart v-if="Global.PopUpType == 'main'" style="width: 300px" :chart-data="StatusBoxData"
                    :key="StatusBoxData.labels.length"></LineChart>
            </div>

            <div class="content" v-if="Action?.id == undefined">
                Derzeitige Intensität: {{ currentValue }}% <br>
                No Action defined
            </div>
            <ActionButton :action-name="F?.name ?? 'Change Value'"> Change Value
            </ActionButton>

        </div>
    </div>
</template>

<script setup lang="ts">
import ActionButton from '@/components/ActionButton.vue'
import { computed } from "vue";
import { Chart, registerables, ChartOptions, } from 'chart.js';
import { useReglerStore } from '@/stores/CtrlLoopStore';

Chart.register(...registerables);
Chart.defaults.color = '#FFFFFF';
Chart.defaults.borderColor = '#30621f'
Chart.defaults.plugins.legend.display = false


import { LineChart } from 'vue-chart-3'
import { Feature } from '@/objects/Feature';
import { useGlobalStore } from '@/stores/globalStore'
import { useFeatureStore } from "@/stores/featureStore";
const featureStore = useFeatureStore()
const Global = useGlobalStore()

const Action = Global.ActionList.find(obj => obj.name == pr.F?.name && obj.id >= Global.CurrentAction)
const pr = defineProps<{ F?: Feature }>()

let currentMap = useReglerStore().CurrentStatus

let currentValue = currentMap.get(pr.F?.name ?? '')

let x = featureStore.CreateXaxis(featureStore.Featuremap)
let Labels = x.get(pr.F?.name || '') ?? [0]
let y = featureStore.CreateYaxis(featureStore.Featuremap)
let LineData = y.get(pr.F?.name || '') ?? [0]
const StatusBoxData = {
    labels: Labels,
    datasets: [
        {
            label: pr.F?.name,
            data: LineData,
            stepped: true,
            borderColor: '#FFFFFF'
        },
    ],
};
</script>

<style>
.box {
    color: #FFFFFF;
    border-radius: 9px;
    background-color: #236326;
    text-align: left;
    margin: 20px;
    padding-bottom: 10px;
}


.heading {
    border-bottom: 2px solid #5EA447;
    padding-top: 5px;
    padding-left: 10px;
    padding-bottom: 5px;
    padding-right: 300px;
    display: flex;
}

.content {
    padding-top: 5px;
    padding-left: 10px;
    display: flex;
}

.icon {
    display: inline-flex;
    align-items: center;
    height: 15px;
    padding: 0px;
    margin: 0px;
}

.statustitle {
    display: flex;
    align-items: center;
    padding-left: 5px;
    font-weight: bolder;
}
</style>