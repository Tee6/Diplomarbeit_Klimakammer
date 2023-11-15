<template>
    <h1> Hallo </h1>
</template>

<script setup lang="ts">
import { useGlobalStore } from '@/stores/globalStore';
const Global = useGlobalStore()
Global.PopUpType = 'liveweather'
</script>