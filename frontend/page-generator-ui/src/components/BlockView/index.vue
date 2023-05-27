<template>
    <GridFrame>
        <template #top>
            <div class="block-section">
                <h3>Block: {{ nestableItem.blockConfig_edit.blockName }}</h3>
                <ItemBreadcrumb :item="nestableItem"></ItemBreadcrumb>
            </div>
        </template>
        <template #main>
            <div>

                <div>
                    <h3>BLOCK CONFIG</h3>
                    <div>
                        <h4>CONTROLS</h4>
                        <button v-if="!nestableItem.isNew" :disabled="!props.nestableItem.isConfigEdited"
                            class="btn btn-success" @click="handleResetConfigClick">Reset</button>
                    </div>
                    <CollapseExpand :active="getIsActive(NameEnum.CONFIG)" :class="NameEnum.CONFIG"
                        @toggle-click="handleToggleSection(NameEnum.CONFIG)">
                        <template #title>
                            {{ TitleEnum.CONFIG }}
                        </template>
                        <template #content>
                            <BlockConfigView :blockConfig="props.nestableItem.blockConfig_edit"></BlockConfigView>
                        </template>
                    </CollapseExpand>
                </div>

                <LineComponent class="py-3"></LineComponent>

                <div>
                    <h3>BLOCK CONTENT</h3>
                    <div>
                        <h4>CONTROLS</h4>
                        <button v-if="!nestableItem.isNew" :disabled="!props.nestableItem.isContentEdited"
                            class="btn btn-success" @click="handleResetContentClick">Reset</button>
                    </div>
                    <CollapseExpand :active="getIsActive(NameEnum.CONTENT)" :class="NameEnum.CONTENT"
                        @toggle-click="handleToggleSection(NameEnum.CONTENT)">
                        <template #title>
                            {{ TitleEnum.CONTENT }}
                        </template>
                        <template #content>
                            <BlockContentView :blockDefinition="blockDefinition"
                                :blockContent="props.nestableItem.blockContent_edit"></BlockContentView>
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
import { reactive, computed, onMounted, watch } from "vue"
import type { ComputedRef } from "vue"

// classes
import CollapseExpand from '../CollapseExpand.vue';
import type { NestableItemBlock } from "../../classes/NestableItemBlock";

// components
import BlockConfigView from "./BlockConfigView.vue"
import BlockContentView from "./BlockContentView.vue"
import LineComponent from "../Line.vue"
import GridFrame from "../MainSidebar/GridFrame.vue";
import ItemBreadcrumb from "../common/ItemBreadcrumb.vue"

// computed
import isDataForRefreshValid from "../../computed/generation/isDataForRefreshValid"

// logic
import handleDisplayNestableItem from "../../logic/handlers/handleDisplayNestableItem"
import handleRefreshUI from "../../logic/handlers/handleRefreshUI"
import handleToggleJSONView from "../../logic/handlers/handleToggleJSONView"

// config
import blocks from "../../config/blocks"
import type { BlockDefinition } from "../../config/blocks"

const props = defineProps<{
    nestableItem: NestableItemBlock
}>()

enum NameEnum {
    CONFIG = "block-configuration-section",
    CONTENT = "block-content-section",
    SUBITEMS = "block-subitems-section",
}
enum TitleEnum {
    CONFIG = "Configuration",
    CONTENT = "Content",
    SUBITEMS = "Subitems",
}

const state = reactive({
    collapsedSet: new Set()
})


// handlers
const handleToggleSection = (name: string) => {
    if (!state.collapsedSet.has(name)) {
        state.collapsedSet.add(name)
    } else {
        state.collapsedSet.delete(name)
    }
}

const handleResetConfigClick = () => {
    props.nestableItem.resetConfig()
}
const handleResetContentClick = () => {
    props.nestableItem.resetContent()

}

const getIsActive = (name: string) => {
    return !state.collapsedSet.has(name)
}

const blockDefinition: ComputedRef<BlockDefinition> = computed(() => {
    const definition = blocks.find((block) => {
        return block.type === props.nestableItem.blockConfig_edit.blockTemplateName
    })
    if (!definition) throw new Error("definition cannot be undefined")
    return definition
})

watch(
    () => props.nestableItem.blockConfig_edit.blockTemplateName,
    () => {
        props.nestableItem.setDefaultFields()
    }
)

onMounted(() => {
    props.nestableItem.displayAsSelected()
})
</script>

<style scoped>
.block-section {
    background-color: rgb(255, 255, 173);
}
</style>