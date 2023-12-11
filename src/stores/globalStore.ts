import { defineStore } from "pinia";
import { useFeatureStore } from "./featureStore";
import { Feature } from "@/objects/Feature";
import { Feat } from "@/objects/Feature";
import { Action } from "@/objects/Feature"
export const useGlobalStore = defineStore('globalStore', {
    state: () => ({
        showPopup: false as boolean, // State Variable if PopUp is currently visible
        activePopup: '' as string, // What kind of Action is going to be added e.g. Sun, Rain,....
        PopUpType: 'main' as string, // On Which View a PopUp is being opened
        Edittype: 'add' as string, // What the PopUp will do (add or edit)
        ActionID: 0 as number,      // continous variable to identify each Action
        ActionList: [] as Action[], // List of every Action that has been created
        CurrentAction: 0 as number, // ID of Last or current Action

        // API
        APIkey: 'a7121575dbfca3daa1bf7948f59c14dd' as string,
        APIStart: 'http://api.openweathermap.org/data/2.5/weather?id=524901&appid=' as string,
        samplesize: 20 as number, // 40 max
        weather: '' as any,
        weatherNOW: '' as any,
        lon: '' as string,
        lat: '' as string,
        PictureLink: '' as string,
        MapArray: [] as Map<string, number>[],

        keyList: [] as string[],
        tempList: [] as number[],
        humidList: [] as number[],
        rainList: [] as number[],
        sunList: [] as number[],
        uvList: [] as number[],
        uvtimeList: [] as string[],
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
            xmlHttp.send(null);
            return xmlHttp.responseText;
        },
        fetchWeather(City: string) {
            let APICall = 'http://api.openweathermap.org/geo/1.0/direct?q=' + City + '&limit=5&appid=' + this.APIkey
            this.weather = this.httpGet(APICall)
            this.weather = JSON.parse(this.weather)
            if (this.weather[0] === undefined) {
                console.log('Place not defined')
                this.lat = '47.27140726748231'
                this.lon = '9.631884405803934'
            } else {
                this.lat = this.weather[0].lat
                this.lon = this.weather[0].lon
            }
            this.weather = this.httpGet('https://api.openweathermap.org/data/2.5/forecast?lat=' + this.lat + '&lon=' + this.lon + '&appid=' + this.APIkey + '&units=metric')
            this.weather = JSON.parse(this.weather)
            console.log(this.weather)
            this.weatherNOW = this.weather.list[0]
            this.extractLists(this.weather.list.slice(0, this.samplesize), this.weather.city.sunrise, this.weather.city.sunset)

            console.log(this.keyList)
            if (this.weather.list[0].weather[0] === undefined) {
                this.PictureLink = 'https://openweathermap.org/img/wn/undefined@2x.png'
            } else {
                this.PictureLink = 'https://openweathermap.org/img/wn/' + this.weather.list[0].weather[0].icon + '@2x.png'
            }
        },
        extractLists(objects: any[], sunrise: number = 0, sunset: number = 0) {
            for (const obj of objects) {
                let sunintensity = 100
                this.keyList.push(this.unixToTime(obj.dt));
                this.tempList.push(obj.main.temp);
                this.humidList.push(obj.main.humidity);
                if (obj.rain) {
                    this.rainList.push(obj.rain);
                }
                this.getUV()

            }
        },
        unixToTime(unixtime: number) {
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
        },
        getUV() {
            const UVHeaders = new Headers();
            UVHeaders.append("x-access-token", "openuv-54nj2rlq0wefqj-io");
            UVHeaders.append("Content-Type", "application/json");

            const requestOptions: RequestInit = {
                method: 'GET',
                headers: UVHeaders,
                redirect: 'follow'
            };

            fetch("https://api.openuv.io/api/v1/forecast?lat=51.5&lng=-0.11&alt=100&dt=", requestOptions)
                .then(response => response.text())
                .then(result => this.ExtractUVData(result))
                .catch(error => console.log('error', error));
        },
        ExtractUVData(uvlist: any) {
            uvlist = JSON.parse(uvlist)
            console.log(uvlist)
            for (const a of uvlist.result) {
                this.uvList.push(a.uv)
                this.uvtimeList.push(a.uv_time.slice(11, 19))
            }
        }
    })
})
