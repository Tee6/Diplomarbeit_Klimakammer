<template>
  <div class="container">
    <div class="button-grid">
      <ActionButton v-for="a of Features.Features" :action-name="a.name" :key="a.name">
      </ActionButton>
      <PopUp :action-name="Global.activePopup" v-if="Global.showPopup">
      </PopUp>
    </div>
  </div>
</template>

<script lang="ts" setup>
import PopUp from '../components/Popup.vue'
import ActionButton from '../components/ActionButton.vue'
import { useFeatureStore } from '../stores/featureStore'
import { useGlobalStore } from '@/stores/globalStore';
const Features = useFeatureStore()
const Global = useGlobalStore()

Global.PopUpType = 'auto'

</script>

<style>
.button-grid {
  display: block;
  font-size: 18px;
  float: left;
}

.container {
  border: 2px solid #000;
  margin-left: 392px;
}
</style>
