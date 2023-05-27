<template>
    <GridFrame>
        <template #top>
            <div class="area-section">
                <h3>Area: {{ nestableItem.areaConfig_edit.areaName }}</h3>
                <ItemBreadcrumb :item="nestableItem"></ItemBreadcrumb>
            </div>
        </template>
        <template #main>
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
                                <button v-if="!nestableItem.isNew" :disabled="!props.nestableItem.isConfigEdited"
                                    class="btn btn-success" @click="handleResetConfigClick">Reset</button>
                            </div>
                            <AreaConfigView :areaConfig="props.nestableItem.areaConfig_edit"></AreaConfigView>
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
                            <div class="d-flex flex-column nowrap">
                                <div>
                                    <h4>CONTROLS</h4>
                                    <button :disabled="!!nestableItem.slotsMax && !nestableItem.isHaveSlotsAvailable"
                                        class="btn btn-success" @click="handleAddAreaClick">Add area</button>
                                    <button :disabled="!!nestableItem.slotsMax && !nestableItem.isHaveSlotsAvailable"
                                        class="btn btn-success" @click="handleAddBlockClick">Add block</button>
                                </div>
                                <SlotAvailability :slots-used="nestableItem.slotsUsed" :slots-max="nestableItem.slotsMax">
                                </SlotAvailability>
                                <AreaSubitemsView :subitems="subitems"></AreaSubitemsView>
                            </div>
                        </template>
                    </CollapseExpand>
                </div>
            </div>
        </template>
        <template #bottom>
            <div class="action-section">
                <button class="btn btn-secondary" @click.stop="handleToggleJSONView">TOGGLE JSON VIEW</button>
                <button :disabled="!isDataForRefreshValid" class="btn btn-success"
                    @click.stop="handleRefreshUI">REFRESH</button>
            </div>
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