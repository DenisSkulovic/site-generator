<template>
    <div>
        <div v-if="isDisplayDropzone">
            <Dropzone @droppedFiles="handleDroppedFiles">
                <template v-slot:default>
                    <h2>Drop JS file here</h2>
                    <p>or click to upload</p>
                </template>
                <template v-slot:dragging>
                    <h2>Release to drop the file</h2>
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

const isDisplayDropzone: Ref<boolean> = ref(props.jsExists ? true : false);

const handleDroppedFiles = (files: FileList) => {
    if (files.length > 0) {
        emit('upload', files.item(0));
        isDisplayDropzone.value = false;
    }
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
  