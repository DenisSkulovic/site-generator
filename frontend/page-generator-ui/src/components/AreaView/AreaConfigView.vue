<template>
    <div>
        <!-- AREA NAME -->
        <TextInputField :label="'Area Name'" :value="props.areaConfig.areaName"
            @change="(e: any) => handleChange('areaName', e)" class="mb-4" />

        <!-- AREA TEMPLATE NAME -->
        <SelectInputField :label="'Area Template Name'" :value="props.areaConfig.areaTemplateName"
            :options="areaTemplateNames" @change="(e: any) => handleChange('areaTemplateName', e)" class="mb-4" />

        <v-divider class="my-4"></v-divider>

        <CollapseExpand :active="state.isAdvancedExpanded"
            @toggle-click="state.isAdvancedExpanded = !state.isAdvancedExpanded">
            <template #title>
                <h3>{{ "Advanced Configuration" }}</h3>
            </template>
            <template #content>
                <!-- INCLUDE CONTAINER -->
                <CheckBoxField :label="'Include Container'" :value="props.areaConfig.isIncludeContainer"
                    @change="(e: any) => handleChange('isIncludeContainer', e)" class="mb-4" />

                <!-- JUSTIFY -->
                <SelectInputField :label="'Justify Content'" :value="props.areaConfig.justify" :options="justifyOptions"
                    @change="(e: any) => handleChange('justify', e)" class="mb-4" />

                <!-- ALIGN -->
                <SelectInputField :label="'Align Items'" :value="props.areaConfig.align" :options="alignOptions"
                    @change="(e: any) => handleChange('align', e)" class="mb-4" />
            </template>
        </CollapseExpand>
    </div>
</template>


<script setup lang="ts">
import { computed, reactive } from "vue"
import { AreaConfig, AreaLayoutEnum } from '../../../../../page_cls_module/build_browser';
import { SelectInputField, CheckBoxField, TextInputField } from "@/components/fields"
import CollapseExpand from "../CollapseExpand.vue";

const props = defineProps<{
    areaConfig: AreaConfig
}>()

const state = reactive({
    isAdvancedExpanded: false
})

const justifyOptions = [
    { value: 'justify-content-start', label: 'justify-content-start' },
    { value: 'justify-content-end', label: 'justify-content-end' },
    { value: 'justify-content-center', label: 'justify-content-center' },
    { value: 'justify-content-between', label: 'justify-content-between' },
    { value: 'justify-content-around', label: 'justify-content-around' },
]


const alignOptions = [
    { value: 'align-items-start', label: 'align-items-start' },
    { value: 'align-items-end', label: 'align-items-end' },
    { value: 'align-items-center', label: 'align-items-center' },
    { value: 'align-items-baseline', label: 'align-items-baseline' },
    { value: 'align-items-stretch', label: 'align-items-stretch' },
]


const areaTemplateNames = computed(() => {
    return Object.values(AreaLayoutEnum).map(item => ({ value: item, label: item }))
})

const handleChange = (fieldName: string, e: any) => {
    (props.areaConfig as any)[fieldName] = e.target.value
}

</script>

<style scoped></style>
