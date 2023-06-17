<template>
    <v-select 
        :label="props.label" 
        :items="options" 
        item-text="label" 
        item-value="value"
        :value="props.value"
        @change="handleChange"
    ></v-select>
</template>

<script lang="ts" setup>

type SelectValue = string | number | boolean | null | undefined
type Option = {label: string, value: SelectValue}
const props = defineProps<{
    label: string
    value: SelectValue
    options: Option[]
}>()

const emit = defineEmits<{
    (e: "change", newVal: SelectValue): void
}>()

const handleChange = (val: SelectValue) => {
    emit("change", val)
}
</script>