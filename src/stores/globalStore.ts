import { defineStore } from "pinia";
import { useFeatureStore } from "./featureStore";
import { Feature } from "@/objects/Feature";
import { Feat } from "@/objects/Feature";
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
        PopUpType: 'main' as string,
        Edittype: 'add' as string,
        ActionID: 0 as number,
        ActionList: [] as Feature[]
    }),
    actions: ({
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
        }
    })
})
