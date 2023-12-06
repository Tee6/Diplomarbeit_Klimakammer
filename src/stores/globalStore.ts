import { defineStore } from "pinia";
import { useFeatureStore } from "./featureStore";
import { Feature } from "@/objects/Feature";
import { Feat } from "@/objects/Feature";
import { Action } from "@/objects/Feature";

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
        weather: '' as any,
        lon: '' as string,
        lat: '' as string,
        PictureLink: '' as string

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
            console.log(City)
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

            this.weather = this.httpGet('https://api.openweathermap.org/data/2.5/weather?lat=' + this.lat + '&lon=' + this.lon + '&appid=' + this.APIkey + '&units=metric')
            console.log(this.weather)
            this.weather = JSON.parse(this.weather)
            console.log(this.weather)
            if (this.weather.weather[0] === undefined) {
                this.PictureLink = 'https://openweathermap.org/img/wn/undefined@2x.png'
            } else {
                this.PictureLink = 'https://openweathermap.org/img/wn/' + this.weather.weather[0].icon + '@2x.png'
            }
        }
    })
})
