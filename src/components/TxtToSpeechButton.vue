<template>
    <button v-if="!active" class="floating-button" @click="startRecording()"><span class="material-symbols-outlined">
            speech_to_text
        </span></button>
    <button v-if="active" class="floating-button" @click="stopRecording()"><span class="material-symbols-outlined">
            mic
        </span></button>
    <p v-if="txtactive" class="message-next-to-button"> Sprich einen Befehl ein </p>
</template>

<script setup lang="ts">
import { useReglerStore } from '@/stores/CtrlLoopStore';
import { ref } from 'vue'
let active = ref(false);
let txtactive = ref(false);
let mediaRecorder: MediaRecorder;
let recordedChunks: Blob[] = [];
function removeText() {
    txtactive.value = false
}
async function startRecording() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        };

        mediaRecorder.onstop = () => {
            const recordedBlob = new Blob(recordedChunks, { type: 'audio/mp3' });
            console.log(recordedBlob)

            useReglerStore().sendAudio(recordedBlob);

            recordedChunks = [];
        };

        mediaRecorder.start();
        active.value = true;
        txtactive.value = true;
        setTimeout(removeText, 3000);
    } catch (error) {
        active.value = false;
        txtactive.value = false;
        console.error('Fehler beim Zugriff auf das Mikrofon:', error);
    }
}

function stopRecording() {
    if (mediaRecorder) {
        mediaRecorder.stop();
        active.value = false;
        txtactive.value = false;
    }
}

</script>

<style>
.floating-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    border: none;
    padding: 15px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 50%;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    background-image: radial-gradient(100% 100% at 100% 0, #23a64f 0, #176c28 100%);
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
}

.floating-button span {
    display: flex;
    align-items: center;
}

.floating-button:hover {
    transform: translateY(-2px);
}

.floating-button:active {
    box-shadow: #219c3a 0 3px 7px inset;
    transform: translateY(2px);
}

.message-next-to-button {
    position: fixed;
    bottom: 25px;
    right: 90px;
    color: #fff;
    font-size: 14px;
    animation: slideAndFade 3s ease-in-out;
}

@keyframes slideAndFade {
    0% {
        opacity: 0;
        transform: translateY(30px);
    }

    10% {
        opacity: 1;
        transform: translateY(0);
    }

    80% {
        opacity: 1;
        transform: translateY(0);
    }

    100% {
        opacity: 0;
        transform: translateY(30px);
    }
}
</style>