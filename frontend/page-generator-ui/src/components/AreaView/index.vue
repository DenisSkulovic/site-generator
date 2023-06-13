<template>
    <GridFrame>
        <template #top>
            <v-card class="mx-2" flat>
                <v-card-title class="area-section">
                    <h3>Area: {{ nestableItem.areaConfig_edit.areaName }}</h3>
                    <ItemBreadcrumb :item="nestableItem"></ItemBreadcrumb>
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
                                            <v-btn color="success" v-if="!nestableItem.isNew"
                                                :disabled="!props.nestableItem.isConfigEdited"
                                                @click="handleResetConfigClick">
                                                Reset
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <AreaConfigView :areaConfig="props.nestableItem.areaConfig_edit">
                                            </AreaConfigView>
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
                                            <v-btn color="success"
                                                :disabled="!!nestableItem.slotsMax && !nestableItem.isHaveSlotsAvailable"
                                                @click="handleAddAreaClick">
                                                Add area
                                            </v-btn>
                                            <v-btn color="success"
                                                :disabled="!!nestableItem.slotsMax && !nestableItem.isHaveSlotsAvailable"
                                                @click="handleAddBlockClick">
                                                Add block
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <SlotAvailability :slots-used="nestableItem.slotsUsed"
                                                :slots-max="nestableItem.slotsMax">
                                            </SlotAvailability>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <AreaSubitemsView :subitems="subitems"></AreaSubitemsView>
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
                <v-card-actions class="action-section">
                    <v-btn color="secondary" @click.stop="handleToggleJSONView">TOGGLE JSON VIEW</v-btn>
                    <v-btn color="success" :disabled="!isDataForRefreshValid" @click.stop="handleRefreshUI">REFRESH</v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </GridFrame>
</template>

<script setup lang="ts">
// misc
import { reactive, computed, onMounted } from "vue"
import type { ComputedRef } from "vue"

// logic
import handleDisplayNestableItem from "../../logic/handlers/handleDisplayNestableItem"
import handleRefreshUI from "../../logic/handlers/handleRefreshUI"
import handleToggleJSONView from "../../logic/handlers/handleToggleJSONView"

// classes
import type { NestableItem } from "../../classes/NestableItem"
import CollapseExpand from '../CollapseExpand.vue';
import type { NestableItemArea } from "../../classes/NestableItemArea"

// components
import AreaConfigView from "./AreaConfigView.vue"
import AreaSubitemsView from "./AreaSubitemsView.vue"
import LineComponent from "../Line.vue"
import SlotAvailability from "../common/SlotAvailability.vue"
import GridFrame from "../MainSidebar/GridFrame.vue";
import ItemBreadcrumb from "../common/ItemBreadcrumb.vue"

// computed
import isDataForRefreshValid from "../../computed/generation/isDataForRefreshValid"

const props = defineProps<{
    nestableItem: NestableItemArea
}>()

enum NameEnum {
    CONFIG = "area-configuration-section",
    CONTENT = "area-content-section",
    SUBITEMS = "area-subitems-section",
}
enum TitleEnum {
    CONFIG = "Configuration",
    CONTENT = "Content",
    SUBITEMS = "Subitems",
}

const state = reactive({
    collapsedSet: new Set()
})


// computed
const subitems: ComputedRef<NestableItem[]> = computed(() => {
    return props.nestableItem.children
})

// handlers
const handleToggleSection = (name: string) => {
    if (!state.collapsedSet.has(name)) {
        state.collapsedSet.add(name)
    } else {
        state.collapsedSet.delete(name)
    }
}
const handleAddAreaClick = () => {
    if (!!props.nestableItem.slotsMax && !props.nestableItem.isHaveSlotsAvailable) throw new Error("cannot add new area")
    props.nestableItem.addNewArea()
}
const handleAddBlockClick = () => {
    if (!!props.nestableItem.slotsMax && !props.nestableItem.isHaveSlotsAvailable) throw new Error("cannot add new block")
    props.nestableItem.addNewBlock()
}

const handleToTopElement = () => {
    handleDisplayNestableItem(null)
}
const handleToParentElement = () => {
    handleDisplayNestableItem(props.nestableItem.parentNestableItem)
}

const handleResetConfigClick = () => {
    props.nestableItem.resetConfig()
}

const getIsActive = (name: string) => {
    return !state.collapsedSet.has(name)
}

onMounted(() => {
    props.nestableItem.displayAsSelected()
})

</script>

<style scoped>
.area-section {
    background-color: rgb(255, 177, 177);
}
</style>