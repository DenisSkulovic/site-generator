<template>
    <VueDraggableNext v-if="props.list" class="dragArea" tag="ul" :list="props.list" :group="{ name: 'g1' }"
        @change="handleChange" :move="onMoveCallback">
        <div v-for="(item, item_i) in props.list" :key="item_i">

            <template v-if="item.parentNestableItem && level === 1">
                <div role="button" class="link-small" @click.stop="handleToParent">
                    <span>{{ "< ...>" }}</span>
                </div>
            </template>
            <component :is="item instanceof NestableItemArea ? NestableItemAreaComp : NestableItemBlockComp" :item="(item as any)">
            </component>

            <template v-if="item instanceof NestableItemArea && item.isCollapsed">
            
            </template>
            <template v-else-if="props.level >= props.maxLevel && item.children.length > 0">
                <span>
                    {{ '< ...>' }}
                </span>
            </template>
            <template v-else-if="item instanceof NestableItemArea && props.level < props.maxLevel">
                <NestedDraggableComp :move="onMoveCallback" :list="item.children" :level="nextLevel"
                    :maxLevel="props.maxLevel" @change="handleChange" />
            </template>
        </div>
    </VueDraggableNext>
</template>

<script lang="ts" setup>
import { computed } from "vue"
import type { ComputedRef } from "vue"
import { VueDraggableNext } from "vue-draggable-next";
import NestableItemAreaComp from "./NestableItemAreaComp.vue"
import NestableItemBlockComp from "./NestableItemBlockComp.vue"
import type { NestableItem } from "../../classes/NestableItem";
import NestedDraggableComp from "./NestedDraggableComp.vue"
import { NestableItemArea } from "../../classes/NestableItemArea";
import { NestableItemBlock } from "../../classes/NestableItemBlock";
import setDataFromNestableConfig from "../../logic/nestable/setDataFromNestableConfig"
import handleDisplayNestableItem from "../../logic/handlers/handleDisplayNestableItem";

const props = defineProps<{
    list: NestableItem[]
    level: number
    maxLevel: number
    move?: (e: any) => boolean
}>()

const nextLevel: ComputedRef<number> = computed(() => {
    return props.level + 1
})

const handleChange = (e: any) => {
    setDataFromNestableConfig()
    emit("change", e)
}

const emit = defineEmits<{
    (e: "change", obj: any): void
}>()

const onMoveCallback = (e: any): boolean => {
    const nestableItem: NestableItem = e.draggedContext.element
    return true
}

const handleToParent = () => {
    const parentItem = props.list[0].parentNestableItem?.parentNestableItem || null
    handleDisplayNestableItem(parentItem)
}
</script>

<style scoped>
.dragArea {
    min-height: 50px;
    outline: 1px dashed;
}
</style>

<style>
.dragArea {
    min-height: 100px;
    min-width: 100px;
    ;
}
</style>