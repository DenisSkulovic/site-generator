<template>
    <div>
        <!-- PAGE NAME -->
        <text-input-field :label="'Page Name'" :value="props.pageConfig.pageName"
            @change="(val) => props.pageConfig.pageName = val" class="mb-4" />

        <v-divider class="my-4"></v-divider>

        <v-expansion-panel>
            <v-expansion-panel-header @click="state.isAdvancedExpanded = !state.isAdvancedExpanded">
                Advanced Configuration
                <v-icon right>
                    {{ state.isAdvancedExpanded ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
                </v-icon>
            </v-expansion-panel-header>

            <v-expansion-panel-content v-if="state.isAdvancedExpanded">
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
            </v-expansion-panel-content>
        </v-expansion-panel>

        <v-divider class="my-4"></v-divider>

        <v-expansion-panel>
            <v-expansion-panel-header @click="state.isAssetsExpanded = !state.isAssetsExpanded">
                Page Assets
                <v-icon right>
                    {{ state.isAssetsExpanded ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
                </v-icon>
            </v-expansion-panel-header>

            <v-expansion-panel-content v-if="state.isAssetsExpanded">
                <AssetsSection :assets="pageConfig.assets" />
            </v-expansion-panel-content>
        </v-expansion-panel>
    </div>
</template>


<script setup lang="ts">
import { computed, watch, reactive } from "vue"
import type { ComputedRef } from "vue"
import { PageConfig, HeadVersionEnum, BootstrapVersionEnum, SkeletonVersionEnum } from '@page_cls_module';
import updateBootstrapVersionInSubitems from "./func/updateBootstrapVersionInSubitems"
import AssetsSection from './assets/AssetsSection.vue';
import {SelectInputField, CheckBoxField} from "@/components/fields"

const props = defineProps<{
    pageConfig: PageConfig
}>()

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
</script>

<style scoped></style>
