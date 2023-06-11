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

            </template>
        </CollapseExpand>

        <LineComp class="my-2"></LineComp>

        <CollapseExpand :active="state.isAssetsExpanded" @toggle-click="state.isAssetsExpanded = !state.isAssetsExpanded">
            <template #title>
                <h5>{{ 'Page Assets' }}</h5>
            </template>
            <template #content>
                <AssetsSection :assets="pageConfig.assets"></AssetsSection>
            </template>
        </CollapseExpand>

    </div>
</template>

<script setup lang="ts">
import { computed, watch, reactive } from "vue"
import type { ComputedRef } from "vue"
import { PageConfig, HeadVersionEnum, BootstrapVersionEnum, SkeletonVersionEnum } from '@page_cls_module';
import LineComp from '../Line.vue';
import TextInputField from "../fields/TextInputField.vue"
import CheckBoxField from "../fields/CheckBoxField.vue"
import SelectInputField from "../fields/SelectInputField.vue"
import updateBootstrapVersionInSubitems from "./func/updateBootstrapVersionInSubitems"
import CollapseExpand from '../CollapseExpand.vue';
import AssetsSection from './assets/AssetsSection.vue';


const props = defineProps<{
    pageConfig: PageConfig
}>()

const state = reactive({
    isAdvancedExpanded: false,
    isAssetsExpanded: true,
})


const headVersions: ComputedRef<{ label: HeadVersionEnum, value: HeadVersionEnum }[]> = computed(() => {
    return Object.values(HeadVersionEnum).map((name) => {
        return { label: name, value: name }
    })
})
const bootstrapVersions: ComputedRef<{ label: BootstrapVersionEnum, value: BootstrapVersionEnum }[]> = computed(() => {
    return Object.values(BootstrapVersionEnum).map((name) => {
        return { label: name, value: name }
    })
})
const skeletonVersions: ComputedRef<{ label: SkeletonVersionEnum, value: SkeletonVersionEnum }[]> = computed(() => {
    return Object.values(SkeletonVersionEnum).map((name) => {
        return { label: name, value: name }
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