<template>
    <div>
        <h4>Script</h4>
        <TextInputField :label="'Asset Name'" :value="asset.name"
            @change="(newVal) => handleChange('name', newVal)"></TextInputField>
        <JSDropZone :downloadUrl="asset.s3Link" :jsExists="isFileExists" @upload="handleUpload" />
        <SelectInputField :label="'Position'" :value="props.asset.position" :options="assetPositions"
            @change="(newVal) => handleChange('position', newVal)"></SelectInputField>
        <CheckBoxField :label="'Async'" :value="props.asset.isAsync" @change="(newVal) => handleChange('isAsync', newVal)">
        </CheckBoxField>
        <CheckBoxField :label="'Defer'" :value="props.asset.isDefer" @change="(newVal) => handleChange('isDefer', newVal)">
        </CheckBoxField>
        <v-btn @click="removeAsset">Delete Asset</v-btn>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, type Ref } from "vue"
import { ScriptAsset, AssetPositionEnum } from '../../../../../../page_cls_module/build_browser';
import CheckBoxField from "../../fields/CheckBoxField.vue"
import SelectInputField from "../../fields/SelectInputField.vue"
import TextInputField from "../../fields/TextInputField.vue"
import { JSDropZone } from "@common_components_module"
import handleUploadAsset from "@/logic/handlers/handleUploadAsset";
import getIsFileExists from "@/utils/getFileExists";

const props = defineProps<{
    asset: ScriptAsset
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
    await handleUploadAsset(file, props.asset.s3Path, "js")
    isFileExists.value = await getIsFileExists(props.asset.s3Link)
}

onMounted(async () => {
    isFileExists.value = await getIsFileExists(props.asset.s3Link)
})
</script>
