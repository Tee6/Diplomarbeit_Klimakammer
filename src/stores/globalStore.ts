import { defineStore } from "pinia";
import { useFeatureStore } from "./featureStore";
//const Features = useFeatureStore();

export const useGlobalStore = defineStore('globalStore', {
    state: () => ({
        sollTemp: 0,
        istTemp: 0,
        sollRain: 0,
        istRain: 0,
        sollHumid: 0,
        istHumid: 0,
        showPopup: false as boolean,
        activePopup: '' as string,
        PopUpType: 'auto' as string,
        ActionList: [{ id: Number, Name: String, value: Number, time: Number }]
    }),
    actions: ({
        TogglePopup() {
            this.showPopup = !this.showPopup
        },
        closePopup() {
            this.showPopup = false
        }, Confirm() {
            this.TogglePopup()
        }
    })
})
