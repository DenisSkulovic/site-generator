<template>
    <div>
        <!-- PAGE NAME -->
        <TextInputField :label="'Page Name'" :value="props.pageConfig.pageName"
            @change="(val) => props.pageConfig.pageName = val" class="mb-4" />

        <v-divider class="my-4"></v-divider>

        <CollapseExpand :active="toggleState['advanced_config']" @toggleClick="() => handleToggleExpandable('advanced_config')">
            <template #title>
                <h3>Advanced Configuration</h3>
            </template>
            <template #content>
                <!-- INCLUDE BOOTSTRAP -->
                <CheckBoxField :label="'Include Bootstrap CSS into bundle'" :value="props.pageConfig.isIncludeBootstrap"
                    @change="(val) => props.pageConfig.isIncludeBootstrap = val" class="mb-4" />

                <!-- HEAD VERSION -->
                <SelectInputField :label="'Head Version'" :value="props.pageConfig.headVersion" :options="headVersions"
                    @change="(val) => props.pageConfig.headVersion = val" class="mb-4" />

                <!-- BOOTSTRAP VERSION -->
                <SelectInputField :label="'Bootstrap Version'" :value="props.pageConfig.bootstrapVersion"
                    :options="bootstrapVersions" @change="(val) => props.pageConfig.bootstrapVersion = val" class="mb-4" />

                <!-- SKELETON VERSION -->
                <SelectInputField :label="'Skeleton Version'" :value="props.pageConfig.templateVersion"
                    :options="skeletonVersions" @change="(val) => props.pageConfig.templateVersion = val" class="mb-4" />
            </template>
        </CollapseExpand>

        <v-divider class="my-4"></v-divider>

        <CollapseExpand :active="toggleState['assets']" @toggleClick="() => handleToggleExpandable('assets')">
            <template #title>
                <h3>Page Assets</h3>
            </template>
            <template #content>
                <AssetsSection :assets="pageConfig.assets" />
            </template>
        </CollapseExpand>
    </div>
</template>


<script setup lang="ts">
import { computed, watch, reactive } from "vue"
import type { ComputedRef } from "vue"
import { PageConfig, HeadVersionEnum, BootstrapVersionEnum, SkeletonVersionEnum } from '../../../../../page_cls_module/build_browser';
import updateBootstrapVersionInSubitems from "./func/updateBootstrapVersionInSubitems"
import AssetsSection from './assets/AssetsSection.vue';
import {SelectInputField, CheckBoxField, TextInputField} from "@/components/fields"
import CollapseExpand from "../CollapseExpand.vue";

const props = defineProps<{
    pageConfig: PageConfig
}>()

const toggleState = reactive({
    advanced_config: false,
    assets: false,
})

const state = reactive({
    isAdvancedExpanded: false,
    isAssetsExpanded: true,
})

const headVersions = computed(() => {
    return Object.values(HeadVersionEnum)
})
const bootstrapVersions = computed(() => {
    return Object.values(BootstrapVersionEnum)
})
const skeletonVersions = computed(() => {
    return Object.values(SkeletonVersionEnum)
})

watch(
    () => props.pageConfig.bootstrapVersion,
    (newVal: BootstrapVersionEnum) => {
        updateBootstrapVersionInSubitems(newVal)
    },
)

const handleToggleExpandable = (name: "advanced_config" | 'assets' ) => {
    toggleState[name] = !toggleState[name]
}
</script>

<style scoped></style>
