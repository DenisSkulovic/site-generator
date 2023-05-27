<template>
    <div>
        <div>
            <CollapseExpand :active="getIsActive(NameEnum.CONFIG)" :class="NameEnum.CONFIG"
                @toggle-click="handleToggleSection(NameEnum.CONFIG)">
                <template #title>
                    <h3>{{ TitleEnum.CONFIG }}</h3>
                </template>
                <template #content>
                    <div>
                        <h4>CONTROLS</h4>
                        <button :disabled="!isPageConfigEdited" class="btn btn-success" @click="handleResetConfigClick">Reset</button>
                        <button :disabled="!!currentPageConfig.value?.headerId && currentPageConfig.value.headerId === editPageConfig.value?.headerId" @click.stop="replaceHeader">Refresh Header</button>
                        <button :disabled="!!currentPageConfig.value?.footerId && currentPageConfig.value.footerId === editPageConfig.value?.footerId" @click.stop="replaceFooter">Refresh Footer</button>
                    </div>
                    <div v-if="editPageConfig?.value">
                        <PageConfigComp :pageConfig="editPageConfig.value"></PageConfigComp>
                    </div>
                </template>
            </CollapseExpand>
        </div>

        <LineComponent class="py-3"></LineComponent>

        <div>
            <CollapseExpand :active="getIsActive(NameEnum.SUBITEMS)" :class="NameEnum.SUBITEMS"
                @toggle-click="handleToggleSection(NameEnum.SUBITEMS)">
                <template #title>
                    <h3>{{ TitleEnum.SUBITEMS }}</h3>
                </template>
                <template #content>
                    <div>
                        <h4>CONTROLS</h4>
                        <button class="btn btn-success" @click="handleAddAreaClick">Add area</button>
                    </div>
                    <PageSubitemsView :subitems="nestableConfig.config"></PageSubitemsView>
                </template>
            </CollapseExpand>

        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, computed } from "vue"
// logic
import handleReset from "../../logic/handlers/handleReset"
import handleAddNewArea from "../../logic/handlers/handleAddNewArea"
import replaceHeader from "../../logic/headerFooter/replaceHeader"
import replaceFooter from "../../logic/headerFooter/replaceFooter"

// classes
import { NestableConfig } from '../../classes/NestableConfig';

// state
import nestableConfig from "../../state/nestable/nestableConfig"
import editPageConfig from '../../state/pageConfig/editPageConfig';
import currentPageConfig from '../../state/pageConfig/currentPageConfig';

// components
import CollapseExpand from '../CollapseExpand.vue';
import PageConfigComp from "./PageConfig.vue";
import PageSubitemsView from './PageSubitemsView.vue';
import LineComponent from "../Line.vue"

// computed
import isPageConfigEdited from "../../computed/pageConfig/isPageConfigEdited"


enum NameEnum {
    CONFIG = "page-configuration-section",
    SUBITEMS = "page-subitems-section",
}
enum TitleEnum {
    CONFIG = "Page Configuration",
    SUBITEMS = "Subitems",
}

const state = reactive({
    collapsedSet: new Set()
})

defineProps<{
    config: NestableConfig
}>()


// handlers
const handleAddAreaClick = () => {
    handleAddNewArea(nestableConfig.config)
}
const handleResetConfigClick = () => {
    handleReset()
}

const handleToggleSection = (name: string) => {
    if (!state.collapsedSet.has(name)) {
        state.collapsedSet.add(name)
    } else {
        state.collapsedSet.delete(name)
    }
}

const getIsActive = (name: string) => {
    return !state.collapsedSet.has(name)
}

</script>

<style scoped></style>