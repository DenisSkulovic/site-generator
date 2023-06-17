<template>
    <div>
        <!-- BLOCK NAME -->
        <TextInputField :label="'Block Name'" :value="props.blockConfig.blockName"
            @change="(val) => props.blockConfig.blockName = val" class="mb-4" />

        <v-divider class="my-4"></v-divider>

        <!-- BLOCK TEMPLATE NAME -->
        <SelectInputField :label="'Block Template Name'" :value="props.blockConfig.blockTemplateName"
            :options="blockTemplateNames" @change="(val) => props.blockConfig.blockTemplateName = val" />
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

const blockTemplateNames: ComputedRef<string[]> = computed(() => {
    return Object.values(BlockTemplateEnum)
})

const handleChange = (fieldName: string, newVal: any) => {
    console.log(`props.blockConfig`, props.blockConfig)
    console.log(`newVal`, newVal);
    (props.blockConfig as any)[fieldName] = newVal
}

</script>

<style scoped></style>
