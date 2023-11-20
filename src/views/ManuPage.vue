<template>
    <h1> Manuelle Steuerung </h1>
    <StatusBox class="StatBox" v-for="a in Features.Features" :-f="a"></StatusBox>
</template>

<script lang="ts" setup>
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
</script>

<style></style>
