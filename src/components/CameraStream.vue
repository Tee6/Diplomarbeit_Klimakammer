<template>
    <div class="camerabox">
        <video>Stream unavailable</video>

        <canvas ref="canvas" style="display: none;" />
    </div>
</template>

<script setup lang="ts">


startcapture();

function startcapture() {
    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        const video = document.querySelector('video');
        if (video === null) {
            return;
        }
        video.srcObject = stream;
        video.onloadedmetadata = (e) => {
            video.play();
        };
    });
}
</script>

<style scoped>
.camerabox {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 270px;
}

video {
    border-radius: 9px;
    width: 90%;
    height: auto;
}

video:hover {
    width: 70%;
    height: auto;
    position: absolute;
    top: 7.5%;
    left: 1%;
}
</style>