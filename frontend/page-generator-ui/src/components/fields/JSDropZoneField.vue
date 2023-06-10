<template>
    <div class="input-group mb-3 d-flex justify-content-between" style="gap:10px;">
        <label class="input-group-text">{{ props.label }}</label>
        <js-drop-zone :jsExists="!!props.value" :downloadUrl="props.value" @upload="handleUpload" />
    </div>
</template>

<script lang="ts" setup>
import JSDropZone from './JSDropZone.vue';

const props = defineProps({
    label: String,
    value: String
});

const emit = defineEmits(['change']);

const handleUpload = (file: File) => {
    emit('change', file);
};
</script>

<style scoped></style>
