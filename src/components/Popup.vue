
<template>
    <div class="popup">
        <div class="popup-inner">
            <slot />
            <h3> {{ Global.activePopup }}</h3>
            <Inner></Inner>
            <br>
            <button class="popup-close" @click="Global.TogglePopup(actionName)">
                Confirm
            </button>
            <button class="popup-close" @click="Global.TogglePopup(actionName)">
                &times;
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import Inner from './PopUpContent.vue'
import { useFeatureStore } from '../stores/featureStore'
import { useGlobalStore } from '../stores/globalStore'
const featureStore = useFeatureStore()
const Global = useGlobalStore()
defineProps({ actionName: { type: String, required: true } })

</script>

<style scoped>
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
    }
}
</style>
