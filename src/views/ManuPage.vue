<template>
    <div class="container">
        <h1>Hallo</h1>
    </div>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue'
import { useFeatureStore } from '../stores/featureStore'
import { useGlobalStore } from '@/stores/globalStore';
const Features = useFeatureStore()
const Global = useGlobalStore()
Global.PopUpType = 'manu'
</script>

<style>
.container {
    margin-left: 392px;
    width: 145%;
    height: 900%;
}
</style>
