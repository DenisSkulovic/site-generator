<template>
    <div>
        <div v-if="isDisplayDropzone">
            <Dropzone @droppedFile="handleDroppedFile">
                <template v-slot:default>
                    <h5>Drop JS file here</h5>
                    <p>or click to upload</p>
                </template>
                <template v-slot:dragging>
                    <h5>Release to drop the file</h5>
                </template>
            </Dropzone>
            <button v-if="jsExists" @click="cancelChange">Cancel</button>
        </div>
        <div v-else>
            <img v-if="jsExists" src="/path-to-your-js-icon.png" alt="JS file">
            <button v-if="jsExists" @click="download">Download JS</button>
            <button v-if="jsExists" @click="changeFile">Change</button>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
import { ref } from "vue"
import type { Ref } from "vue"
import Dropzone from './DropZone.vue';

const props = defineProps<{
    downloadUrl: string,
    jsExists: Boolean
}>()

const emit = defineEmits<{
    (e: "upload", file: File): void
}>()

const isDisplayDropzone: Ref<boolean> = ref(props.jsExists ? false : true);

const handleDroppedFile = (file: File) => {
    emit('upload', file);
    isDisplayDropzone.value = false;
}

const download = () => {
    window.location.href = props.downloadUrl;
}

const changeFile = () => {
    isDisplayDropzone.value = true;
}

const cancelChange = () => {
    isDisplayDropzone.value = false;
}
</script>
  