<template>
    <GridFrame>
        <template #top>
            <v-card class="mx-2" flat>
                <v-card-title class="block-section">
                    <h3>Block: {{ nestableItem.blockConfig_edit.blockName }}</h3>
                    <ItemBreadcrumb :item="nestableItem"></ItemBreadcrumb>
                </v-card-title>
            </v-card>
        </template>

        <template #main>
            <v-container fluid>
                <v-row no-gutters>

                    <!-- BLOCK CONFIG SECTION -->
                    <v-col cols="12">
                        <h3>BLOCK CONFIG</h3>
                        <v-row>
                            <v-col cols="12">
                                <h4>CONTROLS</h4>
                                <v-btn color="success" v-if="!nestableItem.isNew"
                                    :disabled="!props.nestableItem.isConfigEdited" @click="handleResetConfigClick">
                                    Reset
                                </v-btn>
                            </v-col>
                        </v-row>
                        <CollapseExpand :active="getIsActive(NameEnum.CONFIG)" :class="NameEnum.CONFIG"
                            @toggle-click="handleToggleSection(NameEnum.CONFIG)">
                            <template #title>
                                {{ TitleEnum.CONFIG }}
                            </template>
                            <template #content>
                                <BlockConfigView :blockConfig="props.nestableItem.blockConfig_edit"></BlockConfigView>
                            </template>
                        </CollapseExpand>
                    </v-col>

                    <v-divider class="mx-2 py-3"></v-divider>

                    <!-- BLOCK CONTENT SECTION -->
                    <v-col cols="12">
                        <h3>BLOCK CONTENT</h3>
                        <v-row>
                            <v-col cols="12">
                                <h4>CONTROLS</h4>
                                <v-btn color="success" v-if="!nestableItem.isNew"
                                    :disabled="!props.nestableItem.isContentEdited" @click="handleResetContentClick">
                                    Reset
                                </v-btn>
                            </v-col>
                        </v-row>
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