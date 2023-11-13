import { defineStore } from "pinia";
import { useFeatureStore } from "./featureStore";
import { Feature } from "@/objects/Feature";
import { Feat } from "@/objects/Feature";
import { Action } from "@/objects/Feature";
//const Features = useFeatureStore();

export const useGlobalStore = defineStore('globalStore', {
    state: () => ({
        showPopup: false as boolean, // State Variable if PopUp is currently visible
        activePopup: '' as string, // What kind of Action is going to be added e.g. Sun, Rain,....
        PopUpType: 'main' as string, // On Which View a PopUp is being opened
        Edittype: 'add' as string, // What the PopUp will do (add or edit)
        ActionID: 0 as number,      // continous variable to identify each Action
        ActionList: [] as Action[], // List of every Action that has been created
        CurrentAction: 0 as number, // ID of Last or current Action
        ActionCounter: 0 as number
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
