<template>
    <div>
        <h4>Style</h4>
        <TextInputField :label="'Asset Name'" :value="asset.name" @change="(newVal) => handleChange('name', newVal)">
        </TextInputField>
        <CSSDropZone :downloadUrl="asset.s3Link" :cssExists="isFileExists" @upload="handleUpload" />
        <SelectInputField :label="'Position'" :value="props.asset.position" :options="assetPositions"
            @change="(newVal) => handleChange('position', newVal)"></SelectInputField>
        <v-btn @click="removeAsset">Delete Asset</v-btn>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, type Ref } from "vue"
import { StyleAsset, AssetPositionEnum } from '@page_cls_module';
import SelectInputField from "../../fields/SelectInputField.vue"
import TextInputField from "../../fields/TextInputField.vue"
import { CSSDropZone } from "@common_components_module"
import getIsFileExists from "@/utils/getFileExists";
import handleUploadAsset from "@/logic/handlers/handleUploadAsset";

const props = defineProps<{
    asset: StyleAsset
    pagePath: string
}>()
const emit = defineEmits<{
    (e: "delete"): void
}>()

const isFileExists: Ref<boolean> = ref(false)

const assetPositions = computed(() => Object.values(AssetPositionEnum).map((name) => {
    return { label: name, value: name }
}))

const handleChange = (fieldName: string, newVal: any) => {
    (props.asset as any)[fieldName] = newVal
}
const removeAsset = () => {
    emit('delete')
}

const handleUpload = async (file: File) => {
    await handleUploadAsset(file, props.asset.s3Path, "css")
    isFileExists.value = await getIsFileExists(props.asset.s3Link)
}

onMounted(async () => {
    isFileExists.value = await getIsFileExists(props.asset.s3Link)
})
</script>
