<template>
    <div>
        <div v-for="(input, input_i) in props.blockDefinition.inputs" :key="input_i">
            <LineComponent class="py-3" v-if="input_i !== 0"></LineComponent>
            <component :is="input.component" :value="blockContent.data[input.name]" :label="input.label" :options="input.options"
                @change="(e) => handleChange(input.name, e)"></component>
        </div>
    </div>
</template>

<script setup lang="ts">
import LineComponent from "../Line.vue"
import { BlockContent } from '../../../../../page_cls_module/src';
import type { BlockDefinition } from "../../config/blocks"

const props = defineProps<{
    blockContent: BlockContent
    blockDefinition: BlockDefinition
}>()


const handleChange = (fieldName: string, newVal: any) => {
    props.blockContent.data[fieldName] = newVal
}


</script>

<style scoped></style>