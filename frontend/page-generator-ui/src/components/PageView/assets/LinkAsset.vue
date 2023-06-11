<template>
    <div>
        <TextInputField :label="'Relative Path'" :value="props.asset.relativePath"
            @change="(newVal) => handleChange('relativePath', newVal)"></TextInputField>
        <TextInputField :label="'S3 Path'" :value="props.asset.s3Path"
            @change="(newVal) => handleChange('s3Path', newVal)"></TextInputField>
        <SelectInputField :label="'Position'" :value="props.asset.position" :options="assetPositions"
            @change="(newVal) => handleChange('position', newVal)"></SelectInputField>
        <SelectInputField :label="'Rel'" :value="props.asset.rel" :options="assetRels"
            @change="(newVal) => handleChange('rel', newVal)"></SelectInputField>
        <button @click="removeAsset">Delete Asset</button>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { LinkAsset, AssetPositionEnum, AssetRelEnum } from '@page_cls_module';
import TextInputField from "../../fields/TextInputField.vue"
import SelectInputField from "../../fields/SelectInputField.vue"

const props = defineProps<{
    asset: LinkAsset
}>()
const emit = defineEmits<{
    (e: "delete"): void
}>()

const assetPositions = computed(() => Object.values(AssetPositionEnum).map((name) => {
    return { label: name, value: name }
}))

const assetRels = computed(() => Object.values(AssetRelEnum).map((name) => {
    return { label: name, value: name }
}))

const handleChange = (fieldName: string, newVal: any) => {
    (props.asset as any)[fieldName] = newVal
}
const removeAsset = () => {
    emit('delete')
}
</script>
