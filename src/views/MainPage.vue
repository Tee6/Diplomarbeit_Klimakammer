<template>
    <div class="container">
        Willkommen
    </div>
</template>

<script lang="ts" setup>
import { useGlobalStore } from '@/stores/globalStore';
const Global = useGlobalStore()

Global.PopUpType = 'main'
</script>