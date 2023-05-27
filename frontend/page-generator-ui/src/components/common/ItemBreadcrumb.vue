<template>
    <div v-if="props.item" class="breadcrumb">
        <div role="button" class="link-default" @click.stop="handleToTopElement">Top</div>
        <div class="breadcrumb-separator"> > </div>
        <template v-if="parentItem">
            <template v-if="isParentHasParent">
                <div class="breadcrumb-ellipsis"> ... </div>
                <div class="breadcrumb-separator"> > </div>
            </template>
            <div role="button" class="link-default" @click.stop="handleDisplayParent">{{ parentItemName }}</div>
            <div class="breadcrumb-separator"> > </div>
        </template>
        <div class="breadcrumb-item">{{ itemName }}</div>
    </div>
</template>
  
<script setup lang="ts">
import { NestableItem } from "../../classes/NestableItem"
import { NestableItemArea } from "../../classes/NestableItemArea"
import { NestableItemBlock } from "../../classes/NestableItemBlock"
import { computed } from "vue"
import type { ComputedRef } from "vue"
import handleDisplayNestableItem from "../../logic/handlers/handleDisplayNestableItem"

const props = defineProps({
    item: {
        type: Object as () => NestableItem | null,
        default: null
    }
});


const itemName: ComputedRef<string> = computed(() => {
    if (!props.item) return ""
    if (props.item instanceof NestableItemArea) {
        return props.item.areaConfig_edit.areaName
    } else if (props.item instanceof NestableItemBlock) {
        return props.item.blockConfig_edit.blockName
    } else throw new Error("your code is bad")
})
const parentItem: ComputedRef<NestableItem | null> = computed(() => {
    if (!props.item) return null
    return props.item.parentNestableItem
})
const parentItemName = computed(() => {
    if (!parentItem.value) return ""
    if (parentItem.value instanceof NestableItemArea) {
        return parentItem.value.areaConfig_edit.areaName
    } else if (parentItem.value instanceof NestableItemBlock) {
        return parentItem.value.blockConfig_edit.blockName
    } else throw new Error("your code is bad")
})
const isParentHasParent = computed(() => {
    if (!parentItem.value) return false
    if (!parentItem.value.parentNestableItem) return false
    return true
})

const handleToTopElement = () => {
    handleDisplayNestableItem(null)
}
const handleDisplayParent = () => {
    if (!parentItem.value) throw new Error("parentItem.value cannot be undefined")
    handleDisplayNestableItem(parentItem.value)
}

</script>

<style scoped>
.breadcrumb {
    display: flex;
    flex-direction: row;
    gap: 5px;
}


.breadcrumb-separator,
.breadcrumb-ellipsis {
    color: gray;
}

.breadcrumb-item {
    font-weight: bold;
}
</style>
  