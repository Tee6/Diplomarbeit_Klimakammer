<template>
    <div class="mainheading">
        <h1> Einstellungen </h1>
    </div>
    <div class="settings-container">
        <div class="input-group">
            <label for="sample-size" style="margin-right: 10px;">Sample Size: (max: 40)</label>
            <input v-model="settingSampleSize" type="number" id="sample-size"
                :placeholder="String(useGlobalStore().samplesize)" style="width: 70%;" />
        </div>
        <div class="input-group">
            <label for="refresh-time" style="margin-right: 10px;">Refresh Time in ms:</label>
            <input v-model="settingRefreshTime" type="number" id="refresh-time"
                :placeholder="String(useGlobalStore().updatefrequency)" style="width: 70%;" />
        </div>
        <div class="toggle-group">
            <label for="swift-option">Swift Option:</label>
            <input v-model="swiftOption" type="checkbox" id="swift-option" />
        </div>


        <button class="actionBtn button-29" role="button" @click="saveConfig()">Speichern</button>
    </div>


</template>

<script lang="ts" setup>
import { useGlobalStore } from '@/stores/globalStore';

let settingSampleSize: number = useGlobalStore().samplesize;
let settingRefreshTime: number = useGlobalStore().updatefrequency;
let swiftOption: boolean = useGlobalStore().swift;

function saveConfig() {
    useGlobalStore().samplesize = settingSampleSize;
    useGlobalStore().updatefrequency = settingRefreshTime;
    useGlobalStore().swift = swiftOption;
}
</script>

<style>
.input-group {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;

    color: #FFFFFF;
}

.settings-container {
    display: flex;
    flex-direction: column;
    align-items: center;

    margin-left: 42px;
    color: #FFFFFF;
}
</style>