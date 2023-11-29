<template>
    <h1> Manuelle Steuerung </h1>
    <StatusBox style="width: 65%;" :key="Global.ActionList.length" class="StatBox" v-for="a in Features.Features" :-f="a">
    </StatusBox>
    <PopUp :action-name="Global.activePopup" v-if="Global.showPopup">
    </PopUp>
</template>
        
<script lang="ts" setup>
import PopUp from '@/components/Popup.vue'
import StatusBox from '@/components/StatusBox.vue'
import { defineComponent } from 'vue'
import { useFeatureStore } from '@/stores/featureStore'
import { useGlobalStore } from '@/stores/globalStore';
const Features = useFeatureStore()
const Global = useGlobalStore()
Global.PopUpType = 'manu'
if (Features.Features.length < 1) {
    Features.Fill()
}
window.addEventListener('keydown', (e) => {
    if (e.key == 'Escape') {
        Global.closePopup()
    }
});
</script>

<style></style>
