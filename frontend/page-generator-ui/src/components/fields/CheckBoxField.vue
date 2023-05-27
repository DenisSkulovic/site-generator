<template>
    <div class="form-check form-switch mb-3 d-flex justify-content-between" style="gap:10px;">
        <label class="input-group-text">{{props.label}}</label>
        <input class="form-check-input" type="checkbox" role="switch" :checked="props.value" @change="(e) => handleChange(e)" style="transform: scale(1.8);">
    </div>
</template>

<script lang="ts" setup>

const props = defineProps<{
    label: string
    value: boolean | undefined
}>()
const emit = defineEmits<{
    (e: "change", newVal: boolean): void
}>()

const handleChange = (e: any) => {
    const newVal: boolean = e.target.checked
    emit("change", newVal)
}
</script>

<style scoped></style>