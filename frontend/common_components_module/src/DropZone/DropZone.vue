<template>
    <div class="dropzone" @dragover.prevent @drop="onDrop">
        <slot v-if="!dragging">
            Drag and drop files here or click to upload
        </slot>
        <slot v-else>
            Release to drop the files
        </slot>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const dragging = ref(false);

const onDrop = (event: DragEvent) => {
    event.preventDefault();
    dragging.value = false;

    if (!event.dataTransfer) {
        return;
    }

    const files = event.dataTransfer.files;
    const fileArray = Array.from(files);
    // TODO Do something with the files (upload, read, etc.)
};
</script>

<style scoped>
.dropzone {
    border: 2px dashed #aaa;
    padding: 20px;
    text-align: center;
    transition: background-color 0.3s;
}

.dropzone:hover {
    background-color: #f0f0f0;
}
</style>
