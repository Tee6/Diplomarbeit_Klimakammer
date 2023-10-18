<template>
    <div class="listitem">
        {{ }}
    </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from '@/stores/globalStore';
const Global = useGlobalStore()

defineProps({
    FeatureName: { type: String, required: true },
    ValueName: { type: Number, required: true },
    TimeValue: { type: Number, required: true }
})
</script>

<style scoped>
.listitem {
    border: 5px;
    border-color: black;
}
</style>