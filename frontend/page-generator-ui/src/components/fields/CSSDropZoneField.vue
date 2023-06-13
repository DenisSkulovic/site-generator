<template>
    <v-row class="d-flex justify-space-between align-center" no-gutters>
        <v-col cols="auto">
            <label>{{ props.label }}</label>
        </v-col>
        <v-col cols="auto">
            <CSSDropZone :cssExists="!!props.value" :downloadUrl="props.value" @upload="handleUpload" />
        </v-col>
    </v-row>
</template>

<script lang="ts" setup>
import {CSSDropZone} from '../../../../common_components_module';

const props = defineProps({
    label: String,
    value: String
});

const emit = defineEmits(['change']);

const handleUpload = (file: File) => {
    emit('change', file);
};
</script>
