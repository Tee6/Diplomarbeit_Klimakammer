import { defineStore } from "pinia";
import { useFeatureStore } from "./featureStore";
import { Feature } from "@/objects/Feature";
import { Feat } from "@/objects/Feature";
import { Action } from "@/objects/Feature"
import { useChartStore } from "./ChartStore";

export const useGlobalStore = defineStore('globalStore', {
    state: () => ({
        //#region Features
        showPopup: false as boolean, // State Variable if PopUp is currently visible
        activePopup: '' as string, // What kind of Action is going to be added e.g. Sun, Rain,....
        PopUpType: 'main' as string, // On Which View a PopUp is being opened
        Edittype: 'add' as string, // What the PopUp will do (add or edit)
        ActionID: 0 as number,      // continous variable to identify each Action
        ActionList: [] as Action[], // List of every Action that has been created
        CurrentAction: 0 as number, // ID of Last or current Action
        //#endregion Features

        //#region API&Weather
        APIkey: 'a7121575dbfca3daa1bf7948f59c14dd' as string,
        APIStart: 'http://api.openweathermap.org/data/2.5/weather?id=524901&appid=' as string,
        samplesize: 20 as number, // 40 max
        weather: '' as any,
        weatherNOW: '' as any,
        lon: '' as string,
        lat: '' as string,
        cityName: '' as string,
        countryName: '' as string,
        PictureLink: '' as string,
        MapArray: [] as Map<string, number>[],

        keyList: [] as string[],
        tempList: [] as number[],
        humidList: [] as number[],
        rainList: [] as number[],
        sunList: [] as number[],
        showRain: false as boolean,
        //#endregion API&Weather
    }),
    actions: ({
        dateBuilder() {
            let d = new Date();
            let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

            let day = days[d.getDay()];
            let date = d.getDate();
            let month = months[d.getMonth()];
            let year = d.getFullYear();

            return `${day} ${date} ${month} ${year}`;
        },
        TogglePopup() {
            this.showPopup = !this.showPopup
        },
        closePopup() {
            this.showPopup = false
        },
        TaskSort() {
            this.ActionList.sort(function (a, b) {
                return a.time - b.time;
            });
        },
        httpGet(theUrl: string) {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", theUrl, false); // false for synchronous request
            xmlHttp.send();
            return xmlHttp.responseText;
        },
        fetchWeather(City: string) {
            this.CleanWeather()
            let APICall = 'http://api.openweathermap.org/geo/1.0/direct?q=' + City + '&limit=5&appid=' + this.APIkey
            this.weather = this.httpGet(APICall)
            this.weather = JSON.parse(this.weather)
            if (this.weather[0] === undefined) {
                console.log('Place not defined')
                this.lat = '47.27140726748231'
                this.lon = '9.631884405803934'
                this.cityName = "Rankweil"
                this.countryName = "AT"
            } else {
                this.lat = this.weather[0].lat
                this.lon = this.weather[0].lon
                this.cityName = this.weather[0].name
                this.countryName = this.weather[0].country
            }
            this.weather = this.httpGet('https://api.openweathermap.org/data/2.5/onecall?lat=' + this.lat + '&lon=' + this.lon + '&appid=' + this.APIkey + '&units=metric')
            this.weather = JSON.parse(this.weather)
            console.log(this.weather)
            this.weatherNOW = this.weather.current
            this.extractLists(this.weather.hourly.slice(0, this.samplesize))
            if (this.weather.current.weather[0] === undefined) {
                this.PictureLink = 'https://openweathermap.org/img/wn/undefined@2x.png'
            } else {
                this.PictureLink = 'https://openweathermap.org/img/wn/' + this.weather.current.weather[0].icon + '@2x.png'
            }
            useChartStore().updateCharts()
        },
        extractLists(objects: any[]) {
            this.showRain = false;
            for (const obj of objects) {
                this.keyList.push(this.unixToTime(obj.dt));
                this.tempList.push(obj.temp);
                this.humidList.push(obj.humidity);
                this.sunList.push(obj.uvi);
                if (obj.rain) {
                    this.rainList.push(obj.rain['1h']);
                    this.showRain = true;
                } else {
                    this.rainList.push(0);
                }

            }
        },
        unixToTime(unixtime: number = 0) {
            // Erstelle ein Date-Objekt mit dem übergebenen Unix-Zeitstempel (in Millisekunden)
            const datum = new Date(unixtime * 1000);

            // Extrahiere Stunden, Minuten und Sekunden aus dem Date-Objekt
            const stunden = datum.getUTCHours().toString().padStart(2, '0');
            const minuten = datum.getUTCMinutes().toString().padStart(2, '0');
            const sekunden = datum.getUTCSeconds().toString().padStart(2, '0');

            // Gib die formatierte Uhrzeit zurück
            return `${stunden}:${minuten}:${sekunden}`;
        },
        CleanWeather() {
            console.log('CleanWeather')
            this.keyList = []
            this.tempList = []
            this.humidList = []
            this.sunList = []
            this.rainList = []
        },
        WeatherToAction() {
            this.ActionList = []
            let i = 0
            let sampleWeather = this.weather.hourly.slice(0, this.samplesize)
            let laststate: any[] = []

            for (const a of sampleWeather) {
                //#region Sonne
                const SunAction: Action = {
                    id: this.ActionList.length + 1,
                    name: 'Sonne',
                    sollvalue: a.uvi,
                    time: i * 3600,
                    timeString: this.unixToTime(i * 3600),
                }
                if (laststate[0] !== a.uvi) { this.ActionList.push(SunAction); laststate[0] = a.uvi }
                //#endregion Sonne
                //#region Regen
                let r = 0
                if (a.rain) {
                    r = a.rain['1h'];
                }

                const RainAction: Action = {
                    id: this.ActionList.length + 1,
                    name: 'Regen',
                    sollvalue: r,
                    time: i * 3600,
                    timeString: this.unixToTime(i * 3600),
                }
                if (laststate[1] !== r) { this.ActionList.push(RainAction); laststate[1] = r }
                //#endregion
                //#region Luftfeuchtigkeit
                const HumidAction: Action = {
                    id: this.ActionList.length + 1,
                    name: 'Luftfeuchtigkeit',
                    sollvalue: a.humidity,
                    time: i * 3600,
                    timeString: this.unixToTime(i * 3600),
                }
                if (laststate[2] !== a.humidity) { this.ActionList.push(HumidAction); laststate[2] = a.humidity }
                //#endregion Luftfeuchtigkeit
                //#region Temperatur
                const TempAction: Action = {
                    id: this.ActionList.length + 1,
                    name: 'Temperatur',
                    sollvalue: a.temp,
                    time: i * 3600,
                    timeString: this.unixToTime(i * 3600),
                }
                if (laststate[3] !== a.temp) { this.ActionList.push(TempAction); laststate[3] = a.temp }
                //#endregion Temperatur
                i++;
            }
            this.TaskSort()
            useFeatureStore().UpdateMap(this.ActionList)
        }
    })
})
