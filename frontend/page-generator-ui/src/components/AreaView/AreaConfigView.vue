<template>
    <div class="d-flex flex-column nowrap">

        <!-- AREA NAME -->
        <TextInputField :label="'Area Name'" :value="props.areaConfig.areaName"
            @change="(newVal) => handleChange('areaName', newVal)"></TextInputField>

        <LineComp class="my-2"></LineComp>

        <CollapseExpand :active="state.isAdvancedExpanded"
            @toggle-click="state.isAdvancedExpanded = !state.isAdvancedExpanded">
            <template #title>
                <h5>{{ 'Advanced Configuration' }}</h5>
            </template>
            <template #content>

                <!-- INCLUDE CONTAINER -->
                <CheckBoxField :label="'Include Container'" :value="props.areaConfig.isIncludeContainer"
                    @change="(newVal) => handleChange('isIncludeContainer', newVal)"></CheckBoxField>

                <LineComp class="my-2"></LineComp>

                <!-- AREA TEMPLATE NAME -->
                <SelectInputField :label="'Area Template Name'" :value="props.areaConfig.areaTemplateName"
                    :options="areaTemplateNames" @change="(newVal) => handleChange('areaTemplateName', newVal)">
                </SelectInputField>

                <!-- JUSTIFY -->
                <SelectInputField :label="'Justify Content'" :value="props.areaConfig.justify"
                    :options="justifyOptions" @change="(newVal) => handleChange('justify', newVal)">
                </SelectInputField>

                <!-- ALIGN -->
                <SelectInputField :label="'Align Items'" :value="props.areaConfig.align"
                    :options="alignOptions" @change="(newVal) => handleChange('align', newVal)">
                </SelectInputField>


            </template>
        </CollapseExpand>
    </div>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue"
import type { ComputedRef } from "vue"
import { AreaConfig, AreaLayoutEnum } from '../../../../../page_cls_module/src';
import LineComp from '../Line.vue';
import TextInputField from "../fields/TextInputField.vue"
import CheckBoxField from "../fields/CheckBoxField.vue"
import SelectInputField from "../fields/SelectInputField.vue"
import CollapseExpand from '../CollapseExpand.vue';

const props = defineProps<{
    areaConfig: AreaConfig
}>()

const state = reactive({
    isAdvancedExpanded: false
})

const justifyOptions = [
    {label: "", value: ""},
    {label: "justify-content-start", value: "justify-content-start"},
    {label: "justify-content-end", value: "justify-content-end"},
    {label: "justify-content-center", value: "justify-content-center"},
    {label: "justify-content-between", value: "justify-content-between"},
    {label: "justify-content-around", value: "justify-content-around"},
]

const alignOptions = [
    {label: "", value: ""},
    {label: "align-items-start", value: "align-items-start"},
    {label: "align-items-end", value: "align-items-end"},
    {label: "align-items-center", value: "align-items-center"},
    {label: "align-items-baseline", value: "align-items-baseline"},
    {label: "align-items-stretch", value: "align-items-stretch"},
]

const areaTemplateNames: ComputedRef<{label: AreaLayoutEnum, value: AreaLayoutEnum}[]> = computed(() => {
    return Object.values(AreaLayoutEnum).map((name) => {
        return {label: name, value: name}
    })
})

const handleChange = (fieldName: string, newVal: any) => {
    console.log('change', fieldName, newVal)
    props.areaConfig[fieldName] = newVal
}



</script>

<style scoped></style>