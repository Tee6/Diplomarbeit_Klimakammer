
<template>
    <div class="popup">
        <div class="popup-inner">
            <slot />
            <h3> {{ Global.activePopup }}</h3>
            <Inner></Inner>
            <br>
            <button class="button-23 confirm-btn" role="button" @click="Global.TogglePopup()">
                Confirm
            </button>
            <button class="button-23 close-btn" role="button" @click="Global.TogglePopup()">
                &times;
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import Inner from '@/components/PopUpContent.vue'
import { useFeatureStore } from '@/stores/featureStore'
import { useGlobalStore } from '@/stores/globalStore'
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
}

.close-btn {
    margin-left: 10px;
    padding: 5px;
    padding-left: 10px;
    padding-right: 10px;
}
</style>
