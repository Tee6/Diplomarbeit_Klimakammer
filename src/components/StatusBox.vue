<template>
    <div>
        <link rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
        <div class="box" style="width: 60%;">
            <div class="heading">
                <span class="material-symbols-outlined">
                    {{ F?.iconLink }}
                </span>
                <span class="statustitle">{{ F?.name }}</span>
            </div>
            <div class="content" v-if="Action?.id !== undefined">
                <div style="margin-right: 10px;">
                    Derzeitige {{ F?.value_name }}: {{ F?.istvalue }}%
                    <br>
                    Erwartete {{ F?.value_name }}: {{ Action?.sollvalue }}%
                </div>
                <LineChart style="width: 300px" :chart-data="testData"></LineChart>
            </div>
            <div class="content" v-if="Action?.id == undefined">
                No Action defined
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Chart, registerables, ChartOptions, } from 'chart.js';
Chart.register(...registerables);
Chart.defaults.color = '#FFFFFF';
Chart.defaults.borderColor = '#30621f'
Chart.defaults.plugins.legend.display = false
const options = computed<ChartOptions<"line">>(() => ({
    plugins: {
        legend: {
            display: false,
        },
    },
}));


import { LineChart } from 'vue-chart-3'
import { Feature } from '@/objects/Feature';
import { useGlobalStore } from '@/stores/globalStore'
import { useFeatureStore } from "@/stores/featureStore";
const featureStore = useFeatureStore()
const Global = useGlobalStore()

const Action = Global.ActionList.find(obj => obj.name == pr.F?.name && obj.id >= Global.CurrentAction)

const pr = defineProps<{ F?: Feature }>()
let x = featureStore.CreateXaxis(featureStore.Featuremap)
let xz = x.get(pr.F?.name || '') ?? [0]
let y = featureStore.CreateYaxis(featureStore.Featuremap)
let yz = y.get(pr.F?.name || '') ?? [0]
const testData = {
    labels: xz,
    datasets: [
        {
            label: pr.F?.name,
            data: yz,
            stepped: true,
            borderColor: '#FFFFFF'
        },
    ],
};

//box: width: 90.4%;
</script>

<style>
.box {
    color: white;
    border: 5px solid #5EA447;
    border-radius: 9px;
    background-color: #30621f;
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