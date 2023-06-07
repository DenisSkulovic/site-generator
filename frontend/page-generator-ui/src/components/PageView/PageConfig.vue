<template>
    <div class="d-flex flex-column nowrap">

        <!-- PAGE NAME -->
        <TextInputField :label="'Page Name'" :value="props.pageConfig.pageName"
            @change="(newVal) => handleChange('pageName', newVal)"></TextInputField>

        <LineComp class="my-2"></LineComp>

        <CollapseExpand :active="state.isAdvancedExpanded"
            @toggle-click="state.isAdvancedExpanded = !state.isAdvancedExpanded">
            <template #title>
                <h5>{{ 'Advanced Configuration' }}</h5>
            </template>
            <template #content>

                <!-- INCLUDE BOOTSTRAP -->
                <CheckBoxField :label="'Include Bootstrap CSS into bundle'" :value="props.pageConfig.isIncludeBootstrap"
                    @change="(newVal) => handleChange('isIncludeBootstrap', newVal)"></CheckBoxField>

                <LineComp class="my-2"></LineComp>

                <!-- HEAD VERSION -->
                <SelectInputField :label="'Head Version'" :value="props.pageConfig.headVersion" :options="headVersions"
                    @change="(newVal) => handleChange('headVersion', newVal)"></SelectInputField>

                <LineComp class="my-2"></LineComp>

                <!-- BOOTSTRAP VERSION -->
                <SelectInputField :label="'Bootstrap Version'" :value="props.pageConfig.bootstrapVersion"
                    :options="bootstrapVersions" @change="(newVal) => handleChange('bootstrapVersion', newVal)">
                </SelectInputField>

                <LineComp class="my-2"></LineComp>

                <!-- SKELETON VERSION -->
                <SelectInputField :label="'Skeleton Version'" :value="props.pageConfig.templateVersion"
                    :options="skeletonVersions" @change="(newVal) => handleChange('templateVersion', newVal)">
                </SelectInputField>

                <LineComp class="my-2"></LineComp>

                <!-- HEADER ID -->
                <TextInputField :label="'Header ID'" :value="props.pageConfig.headerId"
                    @change="(newVal) => handleChange('headerId', newVal)"></TextInputField>

                <LineComp class="my-2"></LineComp>

                <!-- FOOTER ID -->
                <TextInputField :label="'Footer ID'" :value="props.pageConfig.footerId"
                    @change="(newVal) => handleChange('footerId', newVal)"></TextInputField>

            </template>
        </CollapseExpand>

    </div>
</template>

<script setup lang="ts">
import { computed, watch, reactive } from "vue"
import type { ComputedRef } from "vue"
import { PageConfig, HeadVersionEnum, BootstrapVersionEnum, SkeletonVersionEnum } from '../../../../../page_cls_module/src';
import LineComp from '../Line.vue';
import TextInputField from "../fields/TextInputField.vue"
import CheckBoxField from "../fields/CheckBoxField.vue"
import SelectInputField from "../fields/SelectInputField.vue"
import updateBootstrapVersionInSubitems from "./func/updateBootstrapVersionInSubitems"
import CollapseExpand from '../CollapseExpand.vue';

// TODO instead of having the header and footer id as text input, fetch all available ones, and put them into a select, with some basic info about each, like name, date of creation; probably need to filter ones that have the same bootstrap version; if there is no header and footer with this bootstrap version, I have to unset the value for the id and display an error

const props = defineProps<{
    pageConfig: PageConfig
}>()

const state = reactive({
    isAdvancedExpanded: false
})


const headVersions: ComputedRef<{label: HeadVersionEnum, value: HeadVersionEnum}[]> = computed(() => {
    return Object.values(HeadVersionEnum).map((name) => {
        return {label: name, value: name}
    })
})
const bootstrapVersions: ComputedRef<{label: BootstrapVersionEnum, value: BootstrapVersionEnum}[]> = computed(() => {
    return Object.values(BootstrapVersionEnum).map((name) => {
        return {label: name, value: name}
    })
})
const skeletonVersions: ComputedRef<{label: SkeletonVersionEnum, value: SkeletonVersionEnum}[]> = computed(() => {
    return Object.values(SkeletonVersionEnum).map((name) => {
        return {label: name, value: name}
    })
})

const handleChange = (fieldName: string, newVal: any) => {
    console.log('change', fieldName, newVal);
    (props.pageConfig as any)[fieldName] = newVal
}

watch(
    () => props.pageConfig.bootstrapVersion,
    (newVal: BootstrapVersionEnum) => {
        updateBootstrapVersionInSubitems(newVal)
    },
)

</script>

<style scoped></style>