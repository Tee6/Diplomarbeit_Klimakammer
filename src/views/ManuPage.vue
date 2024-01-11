<template>
    <div class="mainheading">
        <h1> Manuelle Steuerung </h1>
    </div>
    <div style="display: flex; flex-direction: row; flex-wrap: wrap;">
        <StatusBox style="width: fit-content;" :key="a.id" class="StatBox" v-for="a in Features.Features" :-f="a">
        </StatusBox>
    </div>
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
