<template>
    <div class="wrapper">
        <ToggleButton></ToggleButton>

        <div>
            <template v-if="sidebarState.currentView === ViewEnum.MAIN">
                <PageView :config="nestableConfig.config"></PageView>
            </template>
            <template
                v-else-if="currentNestableItem.value instanceof NestableItemArea && sidebarState.currentView === ViewEnum.AREA">
                <AreaView :nestableItem="currentNestableItem.value"></AreaView>
            </template>
            <template
                v-else-if="currentNestableItem.value instanceof NestableItemBlock && sidebarState.currentView === ViewEnum.BLOCK">
                <BlockView :nestableItem="currentNestableItem.value"></BlockView>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
// misc 
import ViewEnum from "./ViewEnum"

// components
import PageView from "../PageView/index.vue"
import AreaView from "../AreaView/index.vue"
import BlockView from "../BlockView/index.vue"
import ToggleButton from "./ToggleButton.vue"
// state
import nestableConfig from "../../state/nestable/nestableConfig"
import currentNestableItem from "../../state/nestable/currentNestableItem"
import sidebarState from "./sidebarState"


// classes
import { NestableItemArea } from "../../classes/NestableItemArea"
import { NestableItemBlock } from "../../classes/NestableItemBlock"

</script>

<style scoped>
.wrapper {
    position: relative;
}

</style>
