<template>
    <GridFrame>
        <template #top>
            <v-card class="mx-2" flat>
                <v-card-title>
                    <h1>Page Live Editor</h1>
                </v-card-title>
            </v-card>
        </template>

        <template #main>
            <v-container fluid>
                <v-row no-gutters>

                    <!-- CONFIG SECTION -->
                    <v-col cols="12">
                        <CollapseExpand :active="getIsActive(NameEnum.CONFIG)" :class="NameEnum.CONFIG"
                            @toggle-click="handleToggleSection(NameEnum.CONFIG)">
                            <template #title>
                                <h3>{{ TitleEnum.CONFIG }}</h3>
                            </template>
                            <template #content>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12">
                                            <h4>CONTROLS</h4>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-btn color="success" :disabled="!isPageConfigEdited"
                                                @click="handleResetConfigClick">
                                                Reset
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                    <v-row v-if="editPageConfig?.value">
                                        <v-col cols="12">
                                            <PageConfigComp :pageConfig="editPageConfig.value"></PageConfigComp>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </template>
                        </CollapseExpand>
                    </v-col>

                    <v-divider class="mx-2 py-3"></v-divider>

                    <!-- SUBITEMS SECTION -->
                    <v-col cols="12">
                        <CollapseExpand :active="getIsActive(NameEnum.SUBITEMS)" :class="NameEnum.SUBITEMS"
                            @toggle-click="handleToggleSection(NameEnum.SUBITEMS)">
                            <template #title>
                                <h3>{{ TitleEnum.SUBITEMS }}</h3>
                            </template>
                            <template #content>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12">
                                            <h4>CONTROLS</h4>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-btn color="success" @click="handleAddAreaClick">
                                                Add area
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <PageSubitemsView :subitems="nestableConfig.config"></PageSubitemsView>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </template>
                        </CollapseExpand>
                    </v-col>

                </v-row>
            </v-container>
        </template>

        <template #bottom>
            <v-card class="mx-2" flat>
                <v-card-actions>
                    <v-btn color="secondary" @click.stop="handleToggleJSONView">TOGGLE JSON VIEW</v-btn>
                    <v-btn color="success" :disabled="!isDataForRefreshValid" @click.stop="handleRefreshUI">REFRESH</v-btn>
                    <v-btn color="success" :disabled="!isPageContentEdited && !isPageConfigEdited" @click.stop="handleSave">SAVE</v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </GridFrame>
</template>


<script setup lang="ts">
import { reactive } from "vue"

// logic
import handleReset from "../../logic/handlers/handleReset"
import handleAddNewArea from "../../logic/handlers/handleAddNewArea"
import handleToggleJSONView from "../../logic/handlers/handleToggleJSONView"
import handleRefreshUI from "../../logic/handlers/handleRefreshUI"
import handleSave from "../../logic/handlers/handleSave"

// classes
import type { NestableConfig } from '../../classes/NestableConfig';

// state
import {nestableConfig} from "../../state/nestableState"
import {editPageConfig} from '../../state/pageConfigState';

// components
import CollapseExpand from '../CollapseExpand.vue';
import PageConfigComp from "./PageConfig.vue";
import PageSubitemsView from './PageSubitemsView.vue';
import GridFrame from "../MainSidebar/GridFrame.vue";

// computed
import isPageContentEdited from "../../computed/pageContent/isPageContentEdited"
import isPageConfigEdited from "../../computed/pageConfig/isPageConfigEdited"
import isDataForRefreshValid from "../../computed/generation/isDataForRefreshValid"


enum NameEnum {
    CONFIG = "page-configuration-section",
    SUBITEMS = "page-subitems-section",
}
enum TitleEnum {
    CONFIG = "Page Configuration",
    SUBITEMS = "Subitems",
}

const state = reactive({
    collapsedSet: new Set([NameEnum.CONFIG])
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