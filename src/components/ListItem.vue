<template>
    <div class="listitem">
        <h2 class="FeatName">{{ Feat.name }}</h2>
        <div>
            <p class="Vals">{{ Feat.value_name }}: {{ Feat.value }}</p>
            <p class="Vals">Time: +{{ Feat.time }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Feature } from '@/objects/Feature';
import { useGlobalStore } from '@/stores/globalStore';
const Global = useGlobalStore()

console.log('List Object created')

defineProps<{ Feat: Feature }>()
</script>

<style scoped>
.listitem {
    border: 5px solid #ffffff;
    border-radius: 10px;
    margin: 10px;
    padding-left: 10px;
    padding-right: 10px;
    color: white;
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;

    background-color: green;
}

.FeatName {
    font-size: 20px;
    font-weight: bold;
    text-align: left;
}

.Vals {
    text-align: right;
}

body {
    margin-top: 130px;
}
</style>