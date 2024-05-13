import { defineStore } from 'pinia'
import { StatusUpdate } from '@/objects/Feature'
import { useGlobalStore } from './globalStore'
import { useFeatureStore } from './featureStore'
import { h } from 'vue'

interface TTSJson {
    "Command": number,
    "Feature": string,
    "data": [
        {
            "value": number,
            "Time": number
        },
        {
            "value": number
        },
        {
            "Place": string
        }
    ]
}

export const useReglerStore = defineStore('ReglerStore', {
    state: () => ({
        SSTIP: 'http://16.171.30.95', // AWS
        //SSTIP: 'http://127.0.0.1:8000', // Localhost
        CamIP: 'http://10.161.250.255:8081/0/stream',
        BackEndIP: 'http://13.48.59.20', // AWS
        //BackEndIP: 'http://10.161.250.255', // Raspberry Pi
        //BackEndIP: 'http://127.0.0.1:8000', // Localhost
        SunURL: '/sun/intensity',
        RainURL: '/water/flow',
        HumidURL: '/air/humidity',
        TempURL: '/air/temperature',
        WindURL: '/air/fanspeed',
        DoorURL: '/misc/door',
        PSUstatusURL: '/psu/status',
        PSUvoltURL: '/psu/voltage',
        set_STTURL: '/transcribe',
        get_STTURL: '/STT/get',
        setRoutine: '/setValue',
        //getRoutineUrL: '/getRoutine',

        History: [] as Map<string, any>[],
        CurrentStatus: new Map<string, any>()
    }),
    actions: {
        getKammerValues() {
            //useGlobalStore().loadRoutine(useGlobalStore().httpGet(this.BackEndIP + this.getRoutineUrL))
            this.CurrentStatus.clear()
            const kammerValues: StatusUpdate = {
                Time: Date.now(),
                Sonne: this.httpGetValue(this.BackEndIP + this.SunURL),
                //Regen: this.httpGetValue(this.BackEndIP + this.RainURL),
                Luftfeuchtigkeit: this.httpGetValue(this.BackEndIP + this.HumidURL),
                Temperatur: this.httpGetValue(this.BackEndIP + this.TempURL),
                Tuer: this.httpGetValue(this.BackEndIP + this.DoorURL),
                PSUstatus: this.httpGetValue(this.BackEndIP + this.PSUstatusURL),
                PSUvolt: this.httpGetValue(this.BackEndIP + this.PSUvoltURL),
                Wind: this.httpGetValue(this.BackEndIP + this.WindURL),
            }
            this.CurrentStatus.set('Time', kammerValues.Time)
            this.CurrentStatus.set('Sonne', kammerValues.Sonne)
            //this.CurrentStatus.set('Regen', kammerValues.Regen)
            this.CurrentStatus.set('Luftfeuchtigkeit', kammerValues.Luftfeuchtigkeit)
            this.CurrentStatus.set('Temperatur', kammerValues.Temperatur)
            this.CurrentStatus.set('Tuer', kammerValues.Tuer)
            this.CurrentStatus.set('PSUstatus', kammerValues.PSUstatus)
            this.CurrentStatus.set('PSUvolt', kammerValues.PSUvolt)
            this.CurrentStatus.set('Wind', kammerValues.Wind)
            this.History.push(this.CurrentStatus)

        },
        httpGetValue(theUrl: string, API: boolean = true) {
            var xmlHttpx = new XMLHttpRequest();
            xmlHttpx.open("GET", theUrl, false); // false for synchronous request
            xmlHttpx.setRequestHeader('Access-Control-Allow-Origin', '*');
            xmlHttpx.send();
            let val = xmlHttpx.responseText
            let match = val.match(/\d+/)
            if (match) {
                val = match[0];
            } else {
                val = "Keine Zahl gefunden.";
            }
            return val
        },
        httpSetValue(theUrl: string, value: string) {
            var xmlHttpx = new XMLHttpRequest();
            xmlHttpx.open("POST", theUrl, false); // false for synchronous request
            xmlHttpx.setRequestHeader('Access-Control-Allow-Origin', '*');
            xmlHttpx.send(value);
        },
        createHistoryMap() {
            // Erstelle eine Map, um Daten für jede Eigenschaft zu speichern
            const propertyDataMap = new Map();

            // Iteriere durch die Historie und fülle die Map
            for (const statusMap of this.History) {
                for (const [key, value] of statusMap) {
                    // Wenn die Eigenschaft noch nicht in der Map enthalten ist, erstelle ein neues Array für sie
                    if (!propertyDataMap.has(key)) {
                        propertyDataMap.set(key, []);
                    }

                    // Füge den Wert zur entsprechenden Eigenschaft hinzu
                    propertyDataMap.get(key).push(value);
                }
            }
        },
        sendandrecieveAudio(value: any) {
            var xmlHttpx = new XMLHttpRequest();
            xmlHttpx.open("POST", this.SSTIP + this.set_STTURL, false); // false for synchronous request
            xmlHttpx.setRequestHeader('Access-Control-Allow-Origin', '*');
            let form = new FormData();
            form.append("file", value, "aufnahme.mp3");
            xmlHttpx.send(form);
            return xmlHttpx.responseText
        },
        createActionfromTTS(inputJson: TTSJson) {
            let upperLetter = inputJson.Feature.charAt(0).toUpperCase() + inputJson.Feature.slice(1);
            if (upperLetter == "None" && inputJson.Command != 2) {
                alert("Kein Befehl erkannt. Bitte versuchen Sie es erneut.")
                return
            }
            if (inputJson.Command == 0) {
                console.log("Setting Timed Feature Value")
                useGlobalStore().createTimedAction(upperLetter, inputJson.data[0].Time, inputJson.data[0].value,)
            } else if (inputJson.Command == 1) {
                console.log("Setting Feature Value")
                useGlobalStore().createTimedAction(upperLetter, 0, inputJson.data[1].value)
            } else if (inputJson.Command == 2) {
                console.log("Setting Live Weather")
                console.log(inputJson.data[2].Place)
                useGlobalStore().fetchWeather(inputJson.data[2].Place)
                useGlobalStore().WeatherToAction()
            }
        },
    }
})