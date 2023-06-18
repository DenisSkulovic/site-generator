<template>
    <div class="dropzone" @dragover.prevent @drop="onDrop" @click.stop="onButtonClick">
        <slot v-if="!dragging">
            Drag and drop files here or click to upload
        </slot>
        <slot v-else>
            Release to drop the files
        </slot>
        <input type="file" id="file" ref="file" v-show="false" @change="onFileChange" multiple>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const emit = defineEmits<{
    (e: "droppedFile", file: File): void
}>()

const dragging = ref(false);
const file = ref();

const onDrop = (event: DragEvent) => {
    event.preventDefault();
    dragging.value = false;

    if (!event.dataTransfer) {
        return;
    }

    const files = event.dataTransfer.files;
    const fileArray = Array.from(files);
    emit("droppedFile", fileArray[0])
};

const onFileChange = (event: Event) => {
    if (event.target) {
        const files = (event.target as HTMLInputElement).files;
        if (files) {
            const fileArray = Array.from(files);
            emit("droppedFile", fileArray[0])
        }
    }
};

const onButtonClick = () => {
    file.value.click();
};
</script>

<style scoped>
.dropzone {
    border: 2px dashed #aaa;
    padding: 20px;
    text-align: center;
    transition: background-color 0.3s;
    width: 100%;
    height: 100px;
    cursor: pointer;
}

.dropzone:hover {
    background-color: #f0f0f0;
}
</style>
