<template>
    <div class="mainheading">
        <h1> Live Wetter </h1>
    </div>
    <div class="search-box">
        <input type="text" class="search-bar" placeholder="Search..." v-model="query"
            @keydown.enter="Global.fetchWeather(query)" />
    </div>
    <h1 v-if="Global.weatherNOW.temp == null">Such nach einem Ort</h1>
    <div class="weather-wrap" v-if="Global.weatherNOW.temp != null">
        <div class="location-box">
            <img :src="Global.PictureLink">
            <div class="location">{{ Global.cityName }}, {{ Global.countryName }}</div>
            <div class="date">{{ Global.dateBuilder() }}</div>
        </div>

        <div class="weather-box">
            <h1 style="margin: 5px;">Temperatur</h1>
            <div class="temp">{{ Math.round(Global.weatherNOW.temp) }}°C</div>
        </div>
        <div class="weather-box">
            <h1 style="margin: 5px;">Luftfeuchtigkeit</h1>
            <div class="temp">{{ Math.round(Global.weatherNOW.humidity) }}%</div>
        </div>
        <div class="weather-box">
            <h1 style="margin: 5px;">UV Index</h1>
            <div class="temp">{{ Global.weatherNOW.uvi }}</div>
        </div>
    </div>

    <h1 v-if='Global.weatherNOW.temp != null'> Vorhersage: </h1>
    <div class="weather-wrap forecast" v-if='Global.weatherNOW.temp != null' :key="Global.cityName">
        <LineChart style="width: 30%" :chart-data="ChartStore.SunData" :key="Global.cityName"></LineChart>
        <LineChart style="width: 30%" :chart-data="ChartStore.TempData" :key="Global.cityName"></LineChart>
        <LineChart v-if="Global.showRain" style="width: 30%" :chart-data="ChartStore.RainData" :key="Global.cityName">
        </LineChart>
        <LineChart style="width: 30%" :chart-data="ChartStore.HumidData" :key="Global.cityName"></LineChart>
        <LineChart style="width: 30%" :chart-data="ChartStore.WindData" :key="Global.cityName"></LineChart>
        <button class="actionBtn button-29" role="button" @click="Global.WeatherToAction()">Apply</button>
    </div>
</template>

<script setup lang="ts">
import { useFeatureStore } from '@/stores/featureStore';
import { useChartStore } from '@/stores/ChartStore';
const ChartStore = useChartStore()
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
Chart.defaults.plugins.legend.display = true
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
    font-size: 80px;
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

    margin-top: 20px;
}

.forecast {
    flex-direction: row;
    flex-wrap: wrap;
    text-align: left;
    align-items: center;
}
</style>