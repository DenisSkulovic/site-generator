<template>
  <div>
    <NestedDraggableComp :list="nestableConfig.toDelete" :level="1" :maxLevel="1" @change="handleChange">
    </NestedDraggableComp>
  </div>
</template>

<script setup lang="ts">
// components
import type { NestableItem } from '../../classes/NestableItem';
import NestedDraggableComp from '../../components/nestable/NestedDraggableComp.vue';

// state
import nestableConfig from "../../state/nestable/nestableConfig"

const cleanToDeleteItems = () => {
  const newArr: NestableItem[] = nestableConfig.toDelete.filter((item: NestableItem) => {
    return !item.isNew
  })
  if (nestableConfig.toDelete.length !== newArr.length) nestableConfig.toDelete = newArr
}
const handleChange = () => {
  nestableConfig.toDelete = nestableConfig.toDelete.flat()
  cleanToDeleteItems()
}


</script>

<style scoped></style>