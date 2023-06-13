<template>
    <div>
        <!-- AREA NAME -->
        <text-input-field 
            :label="'Area Name'" 
            :value="props.areaConfig.areaName" 
            @change="(val) => props.areaConfig.areaName = val" 
            class="mb-4" />

        <v-divider class="my-4"></v-divider>

        <v-expansion-panel>
            <v-expansion-panel-header
                @click="state.isAdvancedExpanded = !state.isAdvancedExpanded"
            >
                Advanced Configuration
                <v-icon right>
                    {{ state.isAdvancedExpanded ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
                </v-icon>
            </v-expansion-panel-header>

            <v-expansion-panel-content v-if="state.isAdvancedExpanded">
                <!-- INCLUDE CONTAINER -->
                <CheckBoxField 
                    :label="'Include Container'" 
                    :value="props.areaConfig.isIncludeContainer" 
                    @change="(val) => props.areaConfig.isIncludeContainer = val" 
                    class="mb-4" />

                <!-- AREA TEMPLATE NAME -->
                <SelectInputField 
                    :label="'Area Template Name'" 
                    :value="props.areaConfig.areaTemplateName" 
                    :options="areaTemplateNames" 
                    @change="(val) => props.areaConfig.areaTemplateName = val" 
                    class="mb-4" />

                <!-- JUSTIFY -->
                <SelectInputField 
                    :label="'Justify Content'" 
                    :value="props.areaConfig.justify" 
                    :options="justifyOptions" 
                    @change="(val) => props.areaConfig.justify = val" 
                    class="mb-4" />

                <!-- ALIGN -->
                <SelectInputField 
                    :label="'Align Items'" 
                    :value="props.areaConfig.align" 
                    :options="alignOptions" 
                    @change="(val) => props.areaConfig.align = val" 
                    class="mb-4" />
            </v-expansion-panel-content>
        </v-expansion-panel>
    </div>
</template>


<script setup lang="ts">
import { computed, reactive } from "vue"
import type { ComputedRef } from "vue"
import { AreaConfig, AreaLayoutEnum } from '../../../../../page_cls_module/src';
import {SelectInputField, CheckBoxField} from "@/components/fields"

const props = defineProps<{
    areaConfig: AreaConfig
}>()

const state = reactive({
    isAdvancedExpanded: false
})

const justifyOptions = [
    "justify-content-start",
    "justify-content-end",
    "justify-content-center",
    "justify-content-between",
    "justify-content-around",
]

const alignOptions = [
    "align-items-start",
    "align-items-end",
    "align-items-center",
    "align-items-baseline",
    "align-items-stretch",
]

const areaTemplateNames = computed(() => {
    return Object.values(AreaLayoutEnum)
})

const handleChange = (fieldName: string, newVal: any) => {
    console.log('change', fieldName, newVal);
    (props.areaConfig as any)[fieldName] = newVal
}

</script>

<style scoped>
</style>
