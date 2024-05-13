import { defineStore } from "pinia";
import { useFeatureStore } from "./featureStore";
import { Feature } from "@/objects/Feature";
import { Feat } from "@/objects/Feature";
import { Action } from "@/objects/Feature"
import { useChartStore } from "./ChartStore";
import { useReglerStore } from "./CtrlLoopStore";

export const useGlobalStore = defineStore('globalStore', {
    state: () => ({
        // Change this to your needs
        samplesize: 20 as number, // 40 max
        updatefrequency: 9000 as number, // time in milliseconds
        swift: true as boolean, // swift mode for Graphs

        //#region Features
        showPopup: false as boolean, // State Variable if PopUp is currently visible
        activePopup: '' as string, // What kind of Action is going to be added e.g. Sun, Rain,....
        PopUpType: 'main' as string, // On Which View a PopUp is being opened
        Edittype: 'add' as string, // What the PopUp will do (add or edit)
        ActionID: 0 as number,      // continous variable to identify each Action
        ActionList: [] as Action[], // List of every Action that has been created
        CurrentAction: 0 as number, // ID of Last or current Action
        Changed: "false" as string,  // State Variable if an Action has been changed,
        UpdateID: 0 as number,       // ID of the last Update
        //#endregion Features
        //#region Status
        StartTime: 0 as number, // Unix Time when the Simulation started
        //#endregion Status
        //#region API&Weather
        APIkey: 'a7121575dbfca3daa1bf7948f59c14dd' as string,
        APIStart: 'http://api.openweathermap.org/data/2.5/weather?id=524901&appid=' as string,

        weather: '' as any, // Helpvariable for weatherAPI
        weatherNOW: '' as any, // Current Weather as JSON
        lon: '' as string, // Longitude of the current Location
        lat: '' as string, // Latitude of the current Location
        cityName: '' as string, // Name of the Fetched City
        countryName: '' as string, // Name of the Fetched Country
        PictureLink: '' as string, // Link to the Weather Icon
        MapArray: [] as Map<string, number>[], // Map of all Features and their Values

        keyList: [] as string[], // List of all Keys for the Graphs
        tempList: [] as number[], // List of all Temperatures for the Graphs
        humidList: [] as number[], // List of all Humidities for the Graphs
        rainList: [] as number[], // List of all Rain for the Graphs
        sunList: [] as number[], // List of all Sun for the Graphs
        windList: [] as number[], // List of all Wind for the Graphs
        showRain: false as boolean, // State Variable if Rain is present
        //#endregion API&Weather
    }),
    actions: ({
        dateBuilder() { // Function to get the current Date in a readable Format
            let d = new Date();
            let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

            let day = days[d.getDay()];
            let date = d.getDate();
            let month = months[d.getMonth()];
            let year = d.getFullYear();

            return `${day} ${date} ${month} ${year}`;
        },
        TogglePopup() { // Toggles visibility of Popup
            this.showPopup = !this.showPopup
        },
        closePopup() { // Closes Popup
            this.showPopup = false
        },
        TaskSort() { // Sorts Actionslist by time
            this.ActionList.sort(function (a, b) {
                return a.time - b.time;
            });
        },
        httpGet(theUrl: string) { // Function to get Data from API
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", theUrl, false); // false for synchronous request
            xmlHttp.send();
            return xmlHttp.responseText;
        },
        fetchWeather(City: string) { // Function to fetch Weather from API
            if (City === '') { City = 'Rankweil' } // Default City: Rankweil
            this.CleanWeather()
            let APICall = 'http://api.openweathermap.org/geo/1.0/direct?q=' + City + '&limit=5&appid=' + this.APIkey // URL to openweathermap API
            this.weather = this.httpGet(APICall)
            this.weather = JSON.parse(this.weather)

            if (this.weather[0] === undefined || this.weather.cod === '400') { // If first Call doesnt work
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
            this.extractLists(this.weather.hourly.slice(0, this.samplesize)) // Extracts Data from Weather for Graphs

            if (this.weather.current.weather[0] === undefined) { // If no Weather Icon is present
                this.PictureLink = 'https://openweathermap.org/img/wn/undefined@2x.png'
            } else {
                this.PictureLink = 'https://openweathermap.org/img/wn/' + this.weather.current.weather[0].icon + '@2x.png'
            }
            useChartStore().updateCharts()
        },
        extractLists(objects: any[]) { // Extracts Data from Weather for Graphs
            this.showRain = false;
            for (const obj of objects) {
                this.keyList.push(this.unixToTime(obj.dt));
                this.tempList.push(obj.temp);
                this.humidList.push(obj.humidity);
                this.sunList.push(this.scaleValue(obj.uvi, 0, 11));
                this.windList.push(obj.wind_speed);
                if (obj.rain) {
                    this.rainList.push(obj.rain['1h']);
                    this.showRain = true;
                } else {
                    this.rainList.push(0);
                }

            }
        },
        scaleValue(value: number, min: number, max: number) { // Scales Values to 0-100
            // Stelle sicher, dass der Wert nicht kleiner als der Mindestwert ist
            value = Math.max(value, min);

            // Stelle sicher, dass der Wert nicht größer als der Maximalwert ist
            value = Math.min(value, max);

            // Berechne den skalierten Wert im Bereich von 0 bis 100
            var scaledValue = ((value - min) / (max - min)) * 100;

            return scaledValue;
        },
        unixToTime(unixtime: number = 0) { // Converts Unix Time to readable Time
            // Erstelle ein Date-Objekt mit dem übergebenen Unix-Zeitstempel (in Millisekunden)
            const datum = new Date(unixtime * 1000);

            // Extrahiere Stunden, Minuten und Sekunden aus dem Date-Objekt
            const stunden = datum.getUTCHours().toString().padStart(2, '0');
            const minuten = datum.getUTCMinutes().toString().padStart(2, '0');
            const sekunden = datum.getUTCSeconds().toString().padStart(2, '0');

            // Gib die formatierte Uhrzeit zurück
            return `${stunden}:${minuten}:${sekunden}`;
        },
        CleanWeather() { // Cleans Weather Variables for new Routine
            console.log('CleanWeather')
            this.keyList = []
            this.tempList = []
            this.humidList = []
            this.sunList = []
            this.rainList = []
            this.windList = []
        },
        WeatherToAction() { // Converts Live Weather to Actions
            this.Changed = "true"
            this.ActionList = []
            let i = 0
            let sampleWeather = this.weather.hourly.slice(0, this.samplesize)
            let laststate: any[] = []

            for (const a of sampleWeather) {
                //#region Sonne
                const SunAction: Action = {
                    id: this.ActionList.length + 1,
                    name: 'Sonne',
                    sollvalue: parseFloat(this.scaleValue(a.uvi, 0, 11).toFixed(2)),
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

                const WindAction: Action = {
                    id: this.ActionList.length + 1,
                    name: 'Wind',
                    sollvalue: a.wind_speed,
                    time: i * 3600,
                    timeString: this.unixToTime(i * 3600),
                }
                if (laststate[4] !== a.wind_speed) { this.ActionList.push(WindAction); laststate[4] = a.wind_speed }
                i++;
            }
            this.TaskSort()
            useFeatureStore().UpdateMap(this.ActionList)
        },
        httpSetValue(theUrl: string, value: string) { // Function to send Data to API
            var xmlHttpx = new XMLHttpRequest();
            xmlHttpx.open("POST", theUrl, false); // false for synchronous request
            xmlHttpx.setRequestHeader('Access-Control-Allow-Origin', '*');
            xmlHttpx.send(value);
        },
        sendRoutine(theUrl: string, value: any) { // Function to send Data to API
            var xmlHttpx = new XMLHttpRequest();
            xmlHttpx.open("PUT", theUrl, false); // false for synchronous request
            xmlHttpx.setRequestHeader('Access-Control-Allow-Origin', '*');
            xmlHttpx.send(value);
        },
        convertToJSON() { // Converts Actions to JSON for API
            // Initialisiere das Ausgabeobjekt mit der gewünschten Struktur
            let outputJSON = {
                "UpdateID": this.UpdateID,
                "Features": {} as Record<string, Action[]>
            };
            this.UpdateID++

            // Iteriere über jedes Objekt in der Eingabeliste
            this.ActionList.forEach(item => {
                // Überprüfe, ob das Feature bereits im Ausgabeobjekt existiert
                if (!outputJSON.Features.hasOwnProperty(item.name)) {
                    outputJSON.Features[item.name] = [];
                }

                // Füge das neue Objekt mit den entsprechenden Werten hinzu
                outputJSON.Features[item.name].push({
                    "id": item.id,
                    "name": item.name,
                    "sollvalue": item.sollvalue,
                    "time": item.time,
                    "timeString": item.timeString
                });
            });

            return outputJSON;
        },
        save() { // Saves Actions to API
            this.Changed = "false"
            this.StartTime = Date.now()
            let savepoint = this.convertToJSON()
            console.log(JSON.stringify(savepoint))
            this.sendRoutine(useReglerStore().BackEndIP + useReglerStore().setRoutine, JSON.stringify(savepoint))
        },
        timestampZuDatumUhrzeit(unixTimestamp: number) { // Converts Unix Time to readable Time for Starttime
            // Erstelle ein Date-Objekt mit dem Unix-Timestamp (in Millisekunden)
            let datumUhrzeit = new Date(unixTimestamp);

            // Monatsnamen für die Ausgabe
            const monatsNamen = [
                "Januar", "Februar", "März", "April", "Mai", "Juni",
                "Juli", "August", "September", "Oktober", "November", "Dezember"
            ];

            // Extrahiere Datum und Uhrzeit-Komponenten
            let tag = datumUhrzeit.getDate();
            let monat = monatsNamen[datumUhrzeit.getMonth()];
            let jahr = datumUhrzeit.getFullYear();
            let stunde = ("0" + datumUhrzeit.getHours()).slice(-2);
            let minute = ("0" + datumUhrzeit.getMinutes()).slice(-2);
            let sekunde = ("0" + datumUhrzeit.getSeconds()).slice(-2);

            // Formatiere das Datum und die Uhrzeit
            let formatiertesDatumUhrzeit = `${tag}. ${monat} ${jahr} ${stunde}:${minute}:${sekunde}`;

            return formatiertesDatumUhrzeit;
        },
        createTimedAction(Feature: string, time: number, sollvalue: number) { // Creates a new Action from TTS
            let action: Action = {
                id: this.ActionList.length + 1,
                name: Feature,
                sollvalue: sollvalue,
                time: time,
                timeString: this.unixToTime(time),
            }
            this.ActionList.push(action)
            this.TaskSort()
            useFeatureStore().UpdateMap(this.ActionList)
        },
        loadRoutine(text: string) {
            try {
                let data = JSON.parse(text);
                data = JSON.parse(data.text);
                console.log(data)
                const features = data.Features;

                for (const feature in features) {
                    features[feature].forEach((item: any) => {
                        this.ActionList.push({
                            id: item.id,
                            name: item.name,
                            sollvalue: item.sollvalue,
                            time: item.time,
                            timeString: item.timeString
                        });
                    });
                }
            } catch (error) {
                console.log("Keine gespeicherte Routine");
            }
        }
    })
})