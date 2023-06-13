<template>
    <v-textarea
        :label="props.label"
        :value="props.value"
        @input="handleChange"
        outlined
    ></v-textarea>
</template>

<script lang="ts" setup>
const props = defineProps<{
    label: string,
    value: string | undefined,
}>()

const emit = defineEmits<{
    (e: "change", newVal: string): void
}>()

const handleChange = (val: string) => {
    emit("change", val)
}
</script>
