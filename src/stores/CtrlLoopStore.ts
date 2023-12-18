import { defineStore } from 'pinia'
import { StatusUpdate } from '@/objects/Feature'
import { useGlobalStore } from './globalStore'

export const useReglerStore = defineStore('ReglerStore', {
    state: () => ({
        BackEndIP: 'http://13.48.59.20',
        SunURL: '/sun/intensity',
        RainURL: '/water/flow',
        HumidURL: '/air/humidity',
        TempURL: '/air/temperature',
    }),
    actions: {
        getKammerValues() {
            const kammerValues: StatusUpdate = {
                Sonne: '',
                Regen: '',
                Luftfeuchtigkeit: '',
                Temperatur: '',
            }
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