<template>
    <div class="camerabox">
        <img :src=cam />
    </div>
</template>

<script setup lang="ts">
import { useReglerStore } from '@/stores/CtrlLoopStore';
let cam = useReglerStore().CamIP
</script>

<style scoped>
.camerabox {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 270px;
    width: auto;
}

img {
    width: 100%;
    border-radius: 9px;
    height: auto;
}

.testbig {
    width: 70%;
    height: auto;
    position: absolute;
    top: 5%;
    left: 0%;
}
</style>