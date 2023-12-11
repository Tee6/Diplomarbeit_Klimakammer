<template>
    <h1> Live Wetter </h1>
    <div class="search-box">
        <input type="text" class="search-bar" placeholder="Search..." v-model="query"
            @keydown.enter="Global.fetchWeather(query)" />
    </div>
    <h1 v-if="Global.weatherNOW.main == null">Such nach einem Ort</h1>
    <div class="weather-wrap" v-if="Global.weatherNOW.main != null">
        <div class="location-box">
            <img :src="Global.PictureLink">
            <div class="location">{{ Global.weather.city.name }}, {{ Global.weather.city.country }}</div>
            <div class="date">{{ Global.dateBuilder() }}</div>
        </div>

        <div class="weather-box">
            <h1 style="margin: 5px;">Temperatur</h1>
            <div class="temp">{{ Math.round(Global.weatherNOW.main.temp) }}°c</div>
        </div>
        <div class="weather-box">
            <h1 style="margin: 5px;">Luftfeuchtigkeit</h1>
            <div class="temp">{{ Math.round(Global.weatherNOW.main.humidity) }}%</div>
        </div>
        <div class="weather-box">
            <h1 style="margin: 5px;">Sonne</h1>
            <div class="temp">{{ 100 - Math.round(Global.weatherNOW.clouds.all) }}%</div>
        </div>
    </div>
    <h1 v-if='Global.weatherNOW.main != null'> Vorhersage: </h1>
    <div class="weather-wrap forecast" v-if='Global.weatherNOW.main != null'>
        <LineChart style="width: 30%" :chart-data="TempData" :key="Global.keyList.length"></LineChart>
        <LineChart style="width: 30%" :chart-data="HumidData" :key="Global.keyList.length"></LineChart>
        <LineChart style="width: 30%" :chart-data="SunData" :key="Global.keyList.length"></LineChart>
    </div>
</template>

<script setup lang="ts">
import { useFeatureStore } from '@/stores/featureStore';
import { useGlobalStore } from '@/stores/globalStore';
const Global = useGlobalStore()
const FeatureStore = useFeatureStore()
Global.PopUpType = 'liveweather'
let query = ''

import { Chart, registerables, ChartOptions, } from 'chart.js';
import { LineChart } from 'vue-chart-3'

Chart.register(...registerables);
Chart.defaults.color = '#FFFFFF';
Chart.defaults.borderColor = '#30621f'
const TempData = {
    labels: Global.keyList,
    datasets: [
        {
            label: 'Temperatur',
            data: Global.tempList,
            borderColor: '#FFFFFF'
        }
    ],
};
const HumidData = {
    labels: Global.keyList,
    datasets: [
        {
            label: 'Luftfeuchtigkeit',
            data: Global.humidList,
            borderColor: '#FFFFFF'
        },
        {
            label: 'Regen',
            data: Global.rainList,
            borderColor: '#FFFFFF'
        }
    ],
};

const SunData = {
    labels: Global.uvtimeList,
    datasets: [
        {
            label: 'Sonne',
            data: Global.uvList,
            borderColor: '#FFFFFF'
        }
    ],
};
Global.getUV()
</script>

<style>
main {
    min-height: 100vh;
    padding: 25px;

    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.75));
}

.search-box {
    width: 92%;
    margin-bottom: 30px;
    margin-left: 30px;
}

.search-box .search-bar {
    display: block;
    width: 100%;
    padding: 15px;

    color: #313131;
    font-size: 20px;

    appearance: none;
    border: none;
    outline: none;
    background: none;

    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 0px 16px 0px 16px;
    transition: 0.4s;
}

.search-box .search-bar:focus {
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
    background-color: rgba(255, 255, 255, 0.75);
    border-radius: 16px 0px 16px 0px;
}

.location-box .location {
    color: #FFF;
    font-size: 32px;
    font-weight: 500;
    text-align: center;
    text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
}

.location-box .date {
    color: #FFF;
    font-size: 20px;
    font-weight: 300;
    font-style: italic;
    text-align: center;
}

.weather-box {
    text-align: center;
    display: flex;
    flex-direction: column;
}

.weather-box .temp {
    display: inline-block;
    padding: 10px 25px;
    color: #FFF;
    font-size: 102px;
    font-weight: 900;

    text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
    background-color: rgba(255, 255, 255, 0.25);
    border-radius: 16px;
    margin: 0px 0px;

    box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}

.weather-box .weather {
    color: #FFF;
    font-size: 48px;
    font-weight: 700;
    font-style: italic;
    text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}

.weather-wrap {
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    align-items: center;

    margin-top: 20px;
}

.forecast {
    flex-direction: row;
}
</style>