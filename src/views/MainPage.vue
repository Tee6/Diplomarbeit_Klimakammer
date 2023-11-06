<template>
    <div class="container">
        Willkommen
        <StatusBox class="StatBox" v-for="a in Features.Features" :-f="a"></StatusBox>
    </div>
</template>

<script lang="ts" setup>
import StatusBox from '@/components/StatusBox.vue'
import { useGlobalStore } from '@/stores/globalStore';
const Global = useGlobalStore()
import { useFeatureStore } from '@/stores/featureStore';
const Features = useFeatureStore()

Global.PopUpType = 'main'
Features.Fill()
</script>

<style>
.StatBox {
    margin-left: 20px;
}
</style>