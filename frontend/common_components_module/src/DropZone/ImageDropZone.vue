<template>
    <div>
        <div v-if="isDisplayDropzone">
            <Dropzone @droppedFiles="handleDroppedFiles">
                <template v-slot:default>
                    <h2>Drop image here</h2>
                    <p>or click to upload</p>
                </template>
                <template v-slot:dragging>
                    <h2>Release to drop the file</h2>
                </template>
            </Dropzone>
            <button @click="cancelChange">Cancel</button>
        </div>
        <div v-else>
            <img v-if="imageUrl" :src="imageUrl" alt="Uploaded image">
            <button @click="changeImage">Change Image</button>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
import { ref } from "vue"
import type { Ref } from "vue"
import Dropzone from './DropZone.vue';

const props = defineProps<{
    imageUrl: string
}>()

const emit = defineEmits<{
    (e: "upload", file: File): void
}>()

const isDisplayDropzone: Ref<boolean> = ref(false)

const handleDroppedFiles = (files: FileList) => {
    if (files.length > 0) {
        emit('upload', files.item(0));
        isDisplayDropzone.value = false;
    }
}
const changeImage = () => {
    isDisplayDropzone.value = true;
}
const cancelChange = () => {
    isDisplayDropzone.value = false;
}
</script>
  