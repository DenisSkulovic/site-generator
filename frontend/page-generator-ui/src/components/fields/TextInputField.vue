<template>
    <v-text-field
        :label="props.label"
        :value="props.value"
        @input="handleChange"
        outlined
    ></v-text-field>
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
