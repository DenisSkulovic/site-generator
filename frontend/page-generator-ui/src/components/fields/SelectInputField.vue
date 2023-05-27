<template>
    <div class="input-group mb-3 d-flex justify-content-between" style="gap:10px;">
        <label class="input-group-text">{{ props.label }}</label>
        <select class="form-select" @change="(e) => handleChange(e)">
            <option :selected="option.value === props.value" v-for="(option, option_i) in options" :key="option_i"
                :value="option.value">
                {{ option.label }}
            </option>
        </select>
    </div>
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

const handleChange = (e: any) => {
    const newVal = e.target.value
    console.log(`newVal`, newVal)
    emit("change", newVal)
}

</script>

<style scoped></style>