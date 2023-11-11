<template>
    <div class="container">
        Simson isch an installateur
    </div>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue'
import { useFeatureStore } from '@/stores/featureStore'
import { useGlobalStore } from '@/stores/globalStore';
const Features = useFeatureStore()
const Global = useGlobalStore()
Global.PopUpType = 'manu'
if (Features.Features.length < 1) {
    Features.Fill()
}
</script>

<style>
.container {
    margin-left: 392px;
    width: 145%;
    height: 900%;
}
</style>
