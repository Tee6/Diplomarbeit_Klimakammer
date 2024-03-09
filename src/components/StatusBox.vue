<template>
    <div style="display: grid;">
        <link rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
        <div class="box Statbox">
            <div class="heading">
                <span class="material-symbols-outlined">
                    {{ F?.iconLink }}
                </span>
                <span class="statustitle">{{ F?.name }}</span>
            </div>
            <div class="content" v-if="Global.ActionID != undefined">
                <div style="margin-right: 10px; height: 50px;">
                    Derzeitige Intensität: {{ useReglerStore().CurrentStatus.get(pr.F?.name ?? '') }}%
                    <br>
                    Erwartete Intensität: {{ Action?.sollvalue }}%
                </div>
                <LineChart v-if="Global.PopUpType == 'main'" style="width: 300px; margin-right: 20px;"
                    :chart-data="StatusBoxData"></LineChart>
                <LineChart v-if="Global.PopUpType == 'main' && pr.F?.name == 'Sonne'"
                    style="width: 300px; margin-right: 20px;" :chart-data="useChartStore().istSunData"></LineChart>

                <LineChart v-if="Global.PopUpType == 'main' && pr.F?.name == 'Temperatur'"
                    style="width: 300px; margin-right: 20px;" :chart-data="useChartStore().istTempData"></LineChart>

                <LineChart v-if="Global.PopUpType == 'main' && pr.F?.name == 'Regen'"
                    style="width: 300px; margin-right: 20px;" :chart-data="useChartStore().istRainData"></LineChart>

                <LineChart v-if="Global.PopUpType == 'main' && pr.F?.name == 'Luftfeuchtigkeit'"
                    style="width: 300px; margin-right: 20px;" :chart-data="useChartStore().istHumidData"></LineChart>
                <LineChart v-if="Global.PopUpType == 'main' && pr.F?.name == 'Wind'"
                    style="width: 300px; margin-right: 20px;" :chart-data="useChartStore().istWindData"></LineChart>
            </div>

            <div class="content" v-if="Global.ActionID == undefined">
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
Chart.defaults.plugins.legend.display = true;

import { ref, Ref } from 'vue'
import { LineChart } from 'vue-chart-3'
import { Feat, Feature } from '@/objects/Feature';
import { useChartStore } from '@/stores/ChartStore'
const ChartStore = useChartStore()
import { useGlobalStore } from '@/stores/globalStore'
import { useFeatureStore } from "@/stores/featureStore";
const featureStore = useFeatureStore()
const Global = useGlobalStore()

const Action = Global.ActionList.find(obj => obj.name == pr.F?.name && obj.id >= Global.CurrentAction)
const pr = defineProps<{ F?: Feature }>()

let currentMap = useReglerStore().CurrentStatus

let currentValue = ref(currentMap.get(pr.F?.name ?? ''))
let ist: any[] = []
async function fetchDataAndPushToArray(url: string): Promise<void> {
    setInterval(async () => {
        ChartStore.StatusChart(pr.F || Feat[0]);
        currentValue = currentMap.get(pr.F?.name ?? '')
        console.log(useReglerStore().CurrentStatus)
    }, Global.updatefrequency);
}
fetchDataAndPushToArray(pr.F?.url ?? '')
let x = useFeatureStore().CreateXaxis(useFeatureStore().Featuremap)
let Labels = x.get(pr.F?.name || '') ?? [0]
let y = useFeatureStore().CreateYaxis(useFeatureStore().Featuremap)
let LineData = y.get(pr.F?.name || '') ?? [0]

const StatusBoxData = {
    labels: Labels,
    datasets: [
        {
            label: 'Sollwert',
            data: LineData,
            stepped: true,
            borderColor: '#FFFFFF'
        },
    ],
}
</script>

<style>
.Statbox {
    width: 100%;
}

.box {
    color: #FFFFFF;
    border-radius: 9px;
    background-color: #236326;
    text-align: left;
    margin: 20px;
}


.heading {
    border-bottom: 2px solid #5EA447;
    padding-top: 5px;
    padding-left: 10px;
    padding-bottom: 5px;
    display: flex;
}

.content {
    padding-top: 5px;
    padding-left: 10px;
    padding-right: 12px;
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