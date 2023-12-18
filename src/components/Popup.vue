
<template>
    <div class="popup">
        <link rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
        <div class="popup-inner">
            <slot />
            <span style="position: relative; top: 5px; padding-right: 5px;" class="material-symbols-outlined">
                {{ l.iconLink }}
            </span>
            <span style=" text-decoration: solid; text-decoration-line: underline;"> {{
                Global.activePopup }}</span>
            <form>
                <label> {{ l.value_name + ' ' }} </label>
                <input type="number" placeholder="%" v-model="FormValue1" />

                <div v-show="Global.PopUpType == 'auto'" style="margin-top: 15px;">
                    <label> Time after Start in minutes </label>
                    <input id="test" type="time" v-model="FormTime">
                </div>
            </form>
            <br>
            <button class="button-23 confirm-btn" role="button" @click="Confirm()">
                Confirm
            </button>
            <button class="button-23 close-btn" role="button" @click="Global.TogglePopup()">
                &times;
            </button>
            <button v-show="Global.Edittype == 'edit'" class="button-23 confirm-btn" role="button" @click="Confirm(true)">
                Löschen
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useFeatureStore } from '@/stores/featureStore'
const featureStore = useFeatureStore()

import { useGlobalStore } from '@/stores/globalStore'
const Global = useGlobalStore()

import { Feature } from '@/objects/Feature';
import { Action } from '@/objects/Feature';
let l: Feature

let FormValue1: number
let FormTime: string
function findFeature() {
    for (const k of featureStore.Features) {
        if (k.name == Global.activePopup) {
            l = k
        }
    }
}
function Confirm(del = false) {
    if (del) {
        const index = Global.ActionList.findIndex(obj => obj.id === Global.ActionID)
        if (index !== undefined) {
            Global.ActionList.splice(index, 1)
        } else {
            console.log('Object not found');
        }
        Global.Edittype = 'add'
        Global.ActionID = 0
        Global.showPopup = false
        Global.TaskSort()
        featureStore.UpdateMap(Global.ActionList)
        return
    }

    if (!(0 <= FormValue1 && FormValue1 <= 100) && FormValue1 !== undefined) {
        alert('Enter a Value between 0 and 100 for the Value')
        return
    }
    if (Global.Edittype == "add") {
        if (FormTime == undefined) {
            FormTime = getCurrentTime()
        }
        Global.TogglePopup()
        let FeatureClone = { ...featureStore.Features[l.id] }
        let minutes = FormTime.split(':')
        let AdvFormTime = FormTime + ':00'
        let realminutes = parseInt(minutes[0]) * 60 * 60 + parseInt(minutes[1]) * 60

        const ActionClone: Action = {
            id: Global.ActionList.length + 1,
            name: Global.activePopup,
            sollvalue: FormValue1,
            time: realminutes,
            timeString: AdvFormTime
        }
        Global.ActionList.push(ActionClone)
        Global.TaskSort()
        featureStore.UpdateMap(Global.ActionList)
    }
    if (Global.Edittype == 'edit') {
        const index = Global.ActionList.findIndex(obj => obj.id === Global.ActionID)
        if (index !== undefined) {
            const foundObject = Global.ActionList[index]
            if (FormValue1 !== undefined) {
                foundObject.sollvalue = FormValue1;
            }
            if (FormTime !== undefined) {
                let minutes = FormTime.split(':')
                let realminutes = parseInt(minutes[0]) * 60 + parseInt(minutes[1])
                foundObject.time = realminutes;
            }
            if (FormTime !== undefined) {
                foundObject.timeString = FormTime;
            }
        } else {
            console.log('Object not found');
        }
        Global.Edittype = 'add'
        Global.ActionID = 0
        Global.showPopup = false
        Global.TaskSort()
        featureStore.UpdateMap(Global.ActionList)
    }
}
findFeature()
defineProps({ actionName: { type: String, required: true } })
function getCurrentTime() {
    const now = new Date();
    const minnum = now.getMinutes() + 1 // falls fehler auftreten bei direkter angabe von Uhrzeit
    const hours = now.getHours().toString().padStart(2, '0'); // Stunde mit führender Null
    const minutes = minnum.toString().padStart(2, '0'); // Minute mit führender Null
    return `${hours}:${minutes}`;
}
</script>

<style scoped>
form {
    padding: 20px;
}

@keyframes PopUpFadeIn {
    0% {
        opacity: 0;
        transform: scale(1.4);
    }

    100% {
        opacity: 1;
        transform: scale(1);
    }
}

.popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.2);



    display: flex;
    align-items: center;
    justify-content: center;

    .popup-inner {
        background: #FFF;
        padding: 20px;
        border-style: solid;
        border-width: 5px;
        border-radius: 13px;
        box-sizing: border-box;
        animation: PopUpFadeIn 0.5s ease 0s 1 normal none;
    }
}

/* CSS */
.button-23 {
    background-color: #FFFFFF;
    border: 1px solid #222222;
    border-radius: 8px;
    box-sizing: border-box;
    color: #222222;
    cursor: pointer;
    display: inline-block;
    font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 20px;
    margin: 0;
    outline: none;
    padding: 13px 23px;
    position: relative;
    text-align: center;
    text-decoration: none;
    touch-action: manipulation;
    transition: box-shadow .2s, -ms-transform .1s, -webkit-transform .1s, transform .1s;
    user-select: none;
    -webkit-user-select: none;
    width: auto;
    letter-spacing: 1px;
    margin-left: 10px;
}


.button-23:focus-visible {
    box-shadow: #222222 0 0 0 2px, rgba(255, 255, 255, 0.8) 0 0 0 4px;
    transition: box-shadow .2s;
}

.button-23:active {
    background-color: #F7F7F7;
    border-color: #000000;
    transform: scale(.96);
}

.button-23:disabled {
    border-color: #DDDDDD;
    color: #DDDDDD;
    cursor: not-allowed;
    opacity: 1;
}

.confirm-btn {
    padding: 8px;
    margin-bottom: 20px;
    transition: all .5s ease;
}

.confirm-btn:hover {
    background-color: #369f4b;
    color: white;
}

.confirm-btn:focus {
    background-color: #369f4b;
    color: white;
}

.close-btn {
    margin-left: 10px;
    padding: 5px;
    padding-left: 10px;
    padding-right: 10px;
    transition: all .5s ease;
}

.close-btn:hover {
    color: white;
    background-color: rgb(236, 74, 74);
}

.close-btn:focus {
    color: white;
    background-color: rgb(236, 74, 74);
}
</style>
