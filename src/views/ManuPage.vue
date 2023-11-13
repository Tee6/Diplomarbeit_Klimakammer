<template>
    <h1> Manuelle Steuerung </h1>
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

<style></style>
