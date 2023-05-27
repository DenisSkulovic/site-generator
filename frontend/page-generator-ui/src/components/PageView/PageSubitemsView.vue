<template>
    <div class="d-flex flex-column nowrap">
        <div class="col-12">
            <NestedDraggableComp :list="subitems" :level="1"
                :maxLevel="editorConfig.maxNestableDepth_PageConfigView"></NestedDraggableComp>
        </div>
        <div class="col-12">
            <h4>TO DELETE</h4>
            <ToDeleteNestable></ToDeleteNestable>
        </div>
    </div>
</template>

<script setup lang="ts">
// classes
import { NestableItem } from "../../classes/NestableItem"

// components
import NestedDraggableComp from '../../components/nestable/NestedDraggableComp.vue';
import ToDeleteNestable from "../../components/nestable/ToDeleteNestable.vue"

// config
import editorConfig from "../../config/editorConfig"

defineProps<{
    subitems: NestableItem[]
}>()
</script>

<style scoped>

</style>