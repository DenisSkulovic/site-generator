<template>
    <div class="input-group mb-3 d-flex justify-content-between" style="gap:10px;">
        <label class="input-group-text">{{ props.label }}</label>
        <textarea class="form-control" :value="props.value" @input="(e) => handleChange(e)" />
    </div>
</template>

<script lang="ts" setup>

const props = defineProps<{
    label: string,
    value: string | undefined,
}>()
const emit = defineEmits<{
    (e: "change", newVal: string): void
}>()

const handleChange = (e: any) => {
    const newVal: string = e.target.value
    emit("change", newVal)
}
</script>

<style scoped></style>