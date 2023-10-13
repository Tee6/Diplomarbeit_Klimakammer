<template>
  <div class="container">
    <div class="button-grid">
      <ActionButton v-for="a of Features.Features" :action-name="a.name" :key="a.name">
      </ActionButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ActionButton from '../components/ActionButton.vue'
import { useFeatureStore } from '../stores/featureStore'
const Features = useFeatureStore()
</script>

<style>
.button-grid {
  display: block;
  font-size: 18px;
  float: left;
}

.container {
  border: 2px solid #000;
  margin-left: 392px;
}
</style>
