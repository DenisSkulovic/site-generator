<template>
    <CollapseExpand :active="isExpanded" @toggleClick="isExpanded = !isExpanded">
        <template #title>
            <h6>Script - {{ asset.name }}</h6>
        </template>
        <template #content>
            <TextInputField :label="'Asset Name'" :value="asset.name" @change="(e) => handleChange('name', e)">
            </TextInputField>
            <JSDropZone :downloadUrl="asset.s3Link" :jsExists="isFileExists" @upload="handleUpload" />
            <SelectInputField :label="'Position'" :value="props.asset.position" :options="assetPositions"
                @change="(e) => handleChange('position', e)"></SelectInputField>
            <CheckBoxField :label="'Async'" :value="props.asset.isAsync" @change="(e) => handleChange('isAsync', e)">
            </CheckBoxField>
            <CheckBoxField :label="'Defer'" :value="props.asset.isDefer" @change="(e) => handleChange('isDefer', e)">
            </CheckBoxField>
            <v-btn @click="removeAsset">Delete Asset</v-btn>
        </template>
    </CollapseExpand>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, type Ref, watch } from "vue"
import { ScriptAsset, AssetPositionEnum } from '../../../../../../page_cls_module/build_browser';
import CheckBoxField from "../../fields/CheckBoxField.vue"
import SelectInputField from "../../fields/SelectInputField.vue"
import TextInputField from "../../fields/TextInputField.vue"
import { JSDropZone } from "@common_components_module"
import handleUploadAsset from "@/logic/handlers/handleUploadAsset";
import getIsFileExists from "@/utils/getFileExists";
import { assetService } from "@/computed/services";
import type { Paths, TagType, FileExtension } from "@/service/AssetService";
import CollapseExpand from "@/components/CollapseExpand.vue";

const props = defineProps<{
    asset: ScriptAsset
}>()
const emit = defineEmits<{
    (e: "delete"): void
}>()

const isExpanded = ref(false)

const isFileExists: Ref<boolean> = ref(false)

const assetPositions = computed(() => Object.values(AssetPositionEnum).map((name) => {
    return { label: name, value: name }
}))

const handleChange = (fieldName: string, e: any) => {
    (props.asset as any)[fieldName] = e.target.value
}
const removeAsset = () => {
    emit('delete')
}
const setAssetPaths = (asset: ScriptAsset, paths: Paths) => {
    asset.path = paths.path
    asset.s3Path = paths.s3Path
    asset.s3Link = paths.s3Link
}

const handleUpload = async (file: File) => {
    const assetUUID = props.asset.uuid
    const type: TagType = "script"
    const fileExtension: FileExtension = "js"
    const newPaths: Paths = assetService.value.getFilePaths(assetUUID, type, fileExtension)
    await handleUploadAsset(file, props.asset.s3Path, "js")
    setAssetPaths(props.asset, newPaths)
}

onMounted(async () => {
    isFileExists.value = await getIsFileExists(props.asset.s3Link)
})

watch(
    () => props.asset.s3Link,
    async () => {
        isFileExists.value = await getIsFileExists(props.asset.s3Link)
    }
)
</script>
