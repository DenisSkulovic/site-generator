<template>
    <div class="position-relative">
        <button class="btn btn-primary toggleSidebarButton" @click.stop="handleToggleDisplaySidebar">
            <span v-if="isDisplaySidebar">HIDE</span>
            <span v-else>SHOW</span>
        </button>

        <div class="inner-wrapper">
            <div v-if="currentNestableItem.value" class="p-3" style="border: 1px solid grey">
                <template v-if="currentNestableItem.value && currentNestableItem.value instanceof NestableItemArea">
                    <div class="d-flex flex-column nowrap" style="background-color: pink;">
                        <h3>Area: {{ currentNestableItem.value.areaConfig_edit.areaName }}</h3>
                    </div>
                </template>
                <template v-else-if="currentNestableItem.value && currentNestableItem.value instanceof NestableItemBlock">
                    <div class="d-flex flex-column nowrap" style="background-color: lightyellow;">
                        <h3>Block: {{ currentNestableItem.value.blockConfig_edit.blockName }}</h3>
                    </div>
                </template>

                <LineComponent class="py-3"></LineComponent>

                <ItemBreadcrumb :item="currentNestableItem.value"></ItemBreadcrumb>
            </div>

            <div>
                <div class="p-3 view-wrapper">
    
                    <template v-if="sidebarState.currentView === ViewEnum.MAIN">
                        <PageView :config="nestableConfig.config"></PageView>
                    </template>
    
                    <template v-else-if="sidebarState.currentView === ViewEnum.AREA">
                        <AreaView :nestableItem="(currentNestableItem.value as NestableItemArea)"></AreaView>
                    </template>
    
                    <template v-else-if="sidebarState.currentView === ViewEnum.BLOCK">
                        <BlockView :nestableItem="(currentNestableItem.value as NestableItemBlock)"></BlockView>
                    </template>
    
                </div>
    
                <div class="p-3" style="border: 1px solid grey">
                    <button class="btn btn-primary" @click.stop="handleToggleJSONView">TOGGLE JSON VIEW</button>
                    <button :disabled="!isDataForRefreshValid" class="btn btn-success"
                        @click.stop="handleRefreshUI">REFRESH</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ViewEnum from "./ViewEnum"
import sidebarState from "./sidebarState"
import PageView from "../PageView/index.vue"
import AreaView from "../AreaView/index.vue"
import BlockView from "../BlockView/index.vue"
import nestableConfig from "../../state/nestable/nestableConfig"
import currentNestableItem from "../../state/nestable/currentNestableItem"
import { NestableItemArea } from "../../classes/NestableItemArea"
import { NestableItemBlock } from "../../classes/NestableItemBlock"
import handleToggleJSONView from "../../logic/handlers/handleToggleJSONView"
import handleToggleDisplaySidebar from "../../logic/handlers/handleToggleDisplaySidebar"
import handleRefreshUI from "../../logic/handlers/handleRefreshUI"
import isDisplaySidebar from "../../state/isDisplaySidebar"
import isDataForRefreshValid from "../../computed/generation/isDataForRefreshValid"
import ItemBreadcrumb from "../common/ItemBreadcrumb.vue"


</script>

<style scoped>
.toggleSidebarButton {
    position: absolute;
    left: 0;
    transform: translateX(-100%);
}

.inner-wrapper {
    display: grid;
    grid-template-rows: 1000fr 1fr;
    height: 100vh;
}

.view-wrapper {
    overflow: auto;
}
</style>