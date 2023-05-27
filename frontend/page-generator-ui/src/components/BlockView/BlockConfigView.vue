<template>
    <div class="d-flex flex-column nowrap">

        <!-- BLOCK NAME -->
        <TextInputField :label="'Block Name'" :value="props.blockConfig.blockName"
            @change="(newVal) => handleChange('blockName', newVal)"></TextInputField>

        <LineComp class="my-2"></LineComp>

        <!-- BLOCK TEMPLATE NAME -->
        <SelectInputField :label="'Block Template Name'" :value="props.blockConfig.blockTemplateName"
            :options="blockTemplateNames" @change="(newVal) => handleChange('blockTemplateName', newVal)">
        </SelectInputField>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import type { ComputedRef } from "vue"
import { BlockConfig, BlockTemplateEnum } from '../../../../../page_cls_module/src';
import TextInputField from "../fields/TextInputField.vue"
// import CheckBoxField from "../fields/CheckBoxField.vue"
import SelectInputField from "../fields/SelectInputField.vue"
import LineComp from '../Line.vue';

// TODO
const props = defineProps<{
    blockConfig: BlockConfig
}>()

const blockTemplateNames: ComputedRef<{ label: BlockTemplateEnum, value: BlockTemplateEnum }[]> = computed(() => {
    return Object.values(BlockTemplateEnum).map((name) => {
        return { label: name, value: name }
    })
})

const handleChange = (fieldName: string, newVal: any) => {
    console.log('change', fieldName, newVal)
    props.blockConfig[fieldName] = newVal
}

</script>

<style scoped></style>