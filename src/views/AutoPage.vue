<template>
  <div class="mainheading">
    <h1> Automatische Steuerung </h1>
  </div>
  <div class="button-grid">
    <ActionButton v-for="a of Features.Features" :action-name="a.name" :key="a.name">
    </ActionButton>
    <PopUp :action-name="Global.activePopup" v-if="Global.showPopup">
    </PopUp>
  </div>
</template>

<script lang="ts" setup>
import PopUp from '@/components/Popup.vue'
import ActionButton from '@/components/ActionButton.vue'
import { useFeatureStore } from '@/stores/featureStore'
import { useGlobalStore } from '@/stores/globalStore';
const Features = useFeatureStore()
const Global = useGlobalStore()

Global.PopUpType = 'auto'
if (Features.Features.length < 1) {
  Features.Fill()
}
</script>

<style>
.button-grid {
  width: 1100px;
  display: flex;
  flex-wrap: wrap;
  font-size: 18px;
  float: left;
  margin: 20px;
}
</style>
