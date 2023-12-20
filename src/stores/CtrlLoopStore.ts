import { defineStore } from 'pinia'
import { StatusUpdate } from '@/objects/Feature'
import { useGlobalStore } from './globalStore'
import { useFeatureStore } from './featureStore'

export const useReglerStore = defineStore('ReglerStore', {
    state: () => ({
        BackEndIP: 'http://13.48.59.20',
        SunURL: '/sun/intensity',
        RainURL: '/water/flow',
        HumidURL: '/air/humidity',
        TempURL: '/air/temperature',

        History: [] as StatusUpdate[],
        CurrentStatus: new Map<string, any>()
    }),
    actions: {
        getKammerValues() {
            this.CurrentStatus.clear()
            const kammerValues: StatusUpdate = {
                Sonne: this.httpGetValue(this.BackEndIP + this.SunURL),
                Regen: this.httpGetValue(this.BackEndIP + this.RainURL),
                Luftfeuchtigkeit: this.httpGetValue(this.BackEndIP + this.HumidURL),
                Temperatur: this.httpGetValue(this.BackEndIP + this.TempURL),
            }
            this.CurrentStatus.set('Sonne', kammerValues.Sonne)
            this.CurrentStatus.set('Regen', kammerValues.Regen)
            this.CurrentStatus.set('Luftfeuchtigkeit', kammerValues.Luftfeuchtigkeit)
            this.CurrentStatus.set('Temperatur', kammerValues.Temperatur)
            this.History.push(kammerValues)
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
        ChangeTemp() {
            console.log('ChangeTemp')
        },
        ChangeSun() {
            console.log('Change Sun')
        },
        ChangeHumid() {
            console.log('Change Humid')
        }
    }
})