import { defineStore } from 'pinia'
import { StatusUpdate } from '@/objects/Feature'
import { useGlobalStore } from './globalStore'
import { useFeatureStore } from './featureStore'

interface TTSJson {
    "Command": number,
    "Feature": string,
    "data": [
        {
            "value": number,
            "Time": number,
            "Feature": string
        },
        {
            "Feature": string,
            "value": number
        },
        {
            "Place": string
        }
    ]
}

export const useReglerStore = defineStore('ReglerStore', {
    state: () => ({
        BackEndIP: 'http://127.0.0.1:8000',
        SunURL: '/sun/intensity',
        RainURL: '/water/flow',
        HumidURL: '/air/humidity',
        TempURL: '/air/temperature',
        DoorURL: '/misc/door',
        PSUstatusURL: '/psu/status',
        PSUvoltURL: '/psu/voltage',
        set_STTURL: '/STT/set',
        get_STTURL: '/STT/get',

        History: [] as Map<string, any>[],
        CurrentStatus: new Map<string, any>()
    }),
    actions: {
        getKammerValues() {
            this.CurrentStatus.clear()
            const kammerValues: StatusUpdate = {
                Time: Date.now(),
                Sonne: this.httpGetValue(this.BackEndIP + this.SunURL),
                Regen: this.httpGetValue(this.BackEndIP + this.RainURL),
                Luftfeuchtigkeit: this.httpGetValue(this.BackEndIP + this.HumidURL),
                Temperatur: this.httpGetValue(this.BackEndIP + this.TempURL),
                Tuer: this.httpGetValue(this.BackEndIP + this.DoorURL),
                PSUstatus: this.httpGetValue(this.BackEndIP + this.PSUstatusURL),
                PSUvolt: this.httpGetValue(this.BackEndIP + this.PSUvoltURL)
            }
            this.CurrentStatus.set('Time', kammerValues.Time)
            this.CurrentStatus.set('Sonne', kammerValues.Sonne)
            this.CurrentStatus.set('Regen', kammerValues.Regen)
            this.CurrentStatus.set('Luftfeuchtigkeit', kammerValues.Luftfeuchtigkeit)
            this.CurrentStatus.set('Temperatur', kammerValues.Temperatur)
            this.CurrentStatus.set('Tuer', kammerValues.Tuer)
            this.CurrentStatus.set('PSUstatus', kammerValues.PSUstatus)
            this.CurrentStatus.set('PSUvolt', kammerValues.PSUvolt)
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
            console.log(propertyDataMap.get('Sonne'))
        },
        sendAudio(value: any) {
            var xmlHttpx = new XMLHttpRequest();
            xmlHttpx.open("POST", this.BackEndIP + this.set_STTURL, false); // false for synchronous request
            xmlHttpx.setRequestHeader('Access-Control-Allow-Origin', '*');
            console.log("Blob sent")
            let form = new FormData();
            form.append("file", value, "aufnahme.mp3");
            xmlHttpx.send(form);
        },
        createActionfromTTS(inputJson: TTSJson) {
            if (inputJson.Command == 0) {
                console.log("Setting Timed Feature Value")
                useGlobalStore().createTimedAction(inputJson.Feature, inputJson.data[0].Time, inputJson.data[0].value,)
            } else if (inputJson.Command == 1) {
                console.log("Setting Feature Value")
                useGlobalStore().createTimedAction(inputJson.Feature, 0, inputJson.data[1].value)
            } else if (inputJson.Command == 2) {
                console.log("Setting Live Weather")
                useGlobalStore().fetchWeather(inputJson.data[2].Place)
                useGlobalStore().WeatherToAction()
            }
        },
        recieveSTT() {
            var xmlHttpx = new XMLHttpRequest();
            xmlHttpx.open("GET", this.BackEndIP + this.get_STTURL, false); // false for synchronous request
            xmlHttpx.setRequestHeader('Access-Control-Allow-Origin', '*');
            xmlHttpx.send();
            return xmlHttpx.responseText
        }
    }
})