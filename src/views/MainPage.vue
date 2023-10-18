<template>
    <div class="container">
        Wilkommen
    </div>
</template>

<script lang="ts" setup>
import { useGlobalStore } from '@/stores/globalStore';
const Global = useGlobalStore()

Global.PopUpType = 'main'
</script>