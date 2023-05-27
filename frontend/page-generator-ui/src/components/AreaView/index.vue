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
                            <button :disabled="!!nestableItem.slotsMax && !nestableItem.isHaveSlotsAvailable" class="btn btn-success"
                                @click="handleAddAreaClick">Add area</button>
                            <button :disabled="!!nestableItem.slotsMax && !nestableItem.isHaveSlotsAvailable" class="btn btn-success"
                                @click="handleAddBlockClick">Add block</button>
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

<script setup lang="ts">
// misc
import { reactive, computed, onMounted } from "vue"
import type { ComputedRef } from "vue"

// logic
import handleDisplayNestableItem from "../../logic/handlers/handleDisplayNestableItem"

// classes
import { NestableItem } from "../../classes/NestableItem"
import CollapseExpand from '../CollapseExpand.vue';

// components
import AreaConfigView from "./AreaConfigView.vue"
import AreaSubitemsView from "./AreaSubitemsView.vue"
import LineComponent from "../Line.vue"
import SlotAvailability from "../common/SlotAvailability.vue"

// composables
import { NestableItemArea } from "../../classes/NestableItemArea"

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

<style scoped></style>