<template>
    <CollapseExpand :active="isExpanded" @toggleClick="isExpanded = !isExpanded">
        <template #title>
            <h6>Link - {{ asset.name }}</h6>
        </template>
        <template #content>
            <TextInputField :label="'Asset Name'" :value="asset.name" @change="(e) => handleChange('name', e)">
            </TextInputField>
            <CSSDropZone :downloadUrl="asset.s3Link" :cssExists="isFileExists" @upload="handleUpload" />
            <SelectInputField :label="'Position'" :value="props.asset.position" :options="assetPositions"
                @change="(e) => handleChange('position', e)"></SelectInputField>
            <v-btn @click="removeAsset">Delete Asset</v-btn>
        </template>
    </CollapseExpand>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch, type Ref } from "vue"
import { LinkAsset, AssetPositionEnum } from '@page_cls_module';
import SelectInputField from "../../fields/SelectInputField.vue"
import TextInputField from "../../fields/TextInputField.vue"
import { CSSDropZone } from "@common_components_module"
import getIsFileExists from "@/utils/getFileExists";
import handleUploadAsset from "@/logic/handlers/handleUploadAsset";
import { assetService } from "@/computed/services";
import type { FileExtension, Paths, TagType } from "@/service/AssetService";
import CollapseExpand from "@/components/CollapseExpand.vue";

const props = defineProps<{
    asset: LinkAsset
    pagePath: string
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
    const asset = props.asset as any
    asset[fieldName] = e.target.value
}
const removeAsset = () => {
    emit('delete')
}

const setAssetPaths = (asset: LinkAsset, paths: Paths) => {
    asset.path = paths.path
    asset.s3Path = paths.s3Path
    asset.s3Link = paths.s3Link
}

const handleUpload = async (file: File) => {
    const assetUUID = props.asset.uuid
    const type: TagType = "link"
    const fileExtension: FileExtension = "css"
    const newPaths: Paths = assetService.value.getFilePaths(assetUUID, type, fileExtension)
    await handleUploadAsset(file, props.asset.s3Path, "css")
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
