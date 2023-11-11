<template>
    <div>
        <link rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
        <div class="box">
            <div class="heading">
                <span class="material-symbols-outlined">
                    {{ F?.iconLink }}
                </span>
                <span class="statustitle">{{ F?.name }}</span>
            </div>
            <div class="content" v-if="F !== undefined">
                Current {{ F.value_name }}: {{ F.istvalue }}%
                <br>
                Expected {{ Action?.value_name }}: {{ Action?.sollvalue }}%
            </div>
            <div class="content" v-if="F == undefined">
                No Programm running
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { Feature } from '@/objects/Feature';
import { useGlobalStore } from '@/stores/globalStore'
const Global = useGlobalStore()

const Action = Global.ActionList.find(obj => obj.name == pr.F?.name && obj.id > Global.CurrentAction)


const pr = defineProps<{ F?: Feature }>()

</script>

<style>
.box {
    color: white;
    border: 5px solid #5EA447;
    border-radius: 9px;
    background-color: #30621f;
    width: 95%;
    text-align: left;
    margin: 20px;
}

.heading {
    border-bottom: 2px solid #5EA447;
    padding-top: 5px;
    padding-left: 10px;
    padding-bottom: 5px;
    padding-right: 300px;
    display: flex;
}

.content {
    padding-left: 10px;
}

.icon {
    display: inline-flex;
    align-items: center;
    height: 15px;
    padding: 0px;
    margin: 0px;
}

.statustitle {
    display: flex;
    align-items: center;
    padding-left: 5px;
}
</style>