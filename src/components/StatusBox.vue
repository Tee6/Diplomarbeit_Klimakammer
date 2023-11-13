<template>
    <div>
        <link rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
        <div class="box" style="width: 40%;">
            <div class="heading">
                <span class="material-symbols-outlined">
                    {{ F?.iconLink }}
                </span>
                <span class="statustitle">{{ F?.name }}</span>
            </div>
            <div class="content" v-if="Action?.id !== undefined">
                <div style="margin-right: 10px;">
                    Current {{ F?.value_name }}: {{ F?.istvalue }}%
                    <br>
                    Expected {{ F?.value_name }}: {{ Action?.sollvalue }}%
                </div>
                <LineChart :chart-data="testData" :options="options"></LineChart>
            </div>
            <div class="content" v-if="Action?.id == undefined">
                No Action defined
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, defineComponent, ref } from "vue";
import { Chart, registerables, ChartData, ChartOptions, } from 'chart.js';
Chart.register(...registerables);
Chart.defaults.color = '#FFFFFF';

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
const Global = useGlobalStore()

const Action = Global.ActionList.find(obj => obj.name == pr.F?.name && obj.id > Global.CurrentAction)

const pr = defineProps<{ F?: Feature }>()

const testData = {
    labels: ['Paris', 'Nîmes'],
    datasets: [
        {
            data: [30, 40, 60, 70, 5],
            backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
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