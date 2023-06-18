<template>
    <div>
        <div v-if="isDisplayDropzone">
            <Dropzone @droppedFile="handleDroppedFile">
                <template v-slot:default>
                    <h5>Drop image here</h5>
                    <p>or click to upload</p>
                </template>
                <template v-slot:dragging>
                    <h5>Release to drop the file</h5>
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

const isDisplayDropzone: Ref<boolean> = ref(props.imageUrl ? false : true);

const handleDroppedFile = (file: File) => {
    emit('upload', file);
    isDisplayDropzone.value = false;
}
const changeImage = () => {
    isDisplayDropzone.value = true;
}
const cancelChange = () => {
    isDisplayDropzone.value = false;
}
</script>
  