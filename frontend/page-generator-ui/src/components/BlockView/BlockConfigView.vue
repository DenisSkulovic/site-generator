<template>
    <div>
        <!-- BLOCK NAME -->
        <TextInputField :label="'Block Name'" :value="props.blockConfig.blockName"
            @change="(e) => handleChange('blockName', e)" class="mb-4" />

        <v-divider class="my-4"></v-divider>

        <!-- BLOCK TEMPLATE NAME -->
        <SelectInputField :label="'Block Template Name'" :value="props.blockConfig.blockTemplateName"
            :options="blockTemplateNames" @change="(e) => handleChange('blockTemplateName', e)" />
    </div>
</template>


<script setup lang="ts">
import { computed } from "vue"
import type { ComputedRef } from "vue"
import { BlockConfig, BlockTemplateEnum } from '../../../../../page_cls_module/build_browser';
import {SelectInputField, TextInputField} from "@/components/fields"

const props = defineProps<{
    blockConfig: BlockConfig
}>()

const blockTemplateNames: ComputedRef<{value: string, label: string}[]> = computed(() => {
    return Object.values(BlockTemplateEnum).map(item => ({value: item, label: item}))
})

const handleChange = (fieldName: string, e: any) => {
    (props.blockConfig as any)[fieldName] = e.target.value
}

</script>

<style scoped></style>
