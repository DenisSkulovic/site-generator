<template>
    <v-switch :label="props.label" :input-value="props.value" @change="handleChange" class="mb-3"></v-switch>
</template>

<script lang="ts" setup>
const props = defineProps<{
    label: string,
    value: boolean | undefined,
}>()

const emit = defineEmits<{
    (e: "change", newVal: boolean): void
}>()

const handleChange = (val: boolean) => {
    emit("change", val)
}
</script>
