<template>
    <div>
        <div v-for="(input, input_i) in props.blockDefinition.inputs" :key="input_i">
            <v-divider class="my-3"></v-divider>
            <component :is="(input.component as any)" :value="blockContent.data[input.name]" :label="input.label" :options="input.options"
                @change="(e: any) => handleChange(input.name, e)"></component>
        </div>
    </div>
</template>

<script setup lang="ts">
import LineComponent from "../Line.vue"
import type { BlockContent } from '../../../../../page_cls_module/src';
import type { BlockDefinition } from "../../config/blocks"

const props = defineProps<{
    blockContent: BlockContent
    blockDefinition: BlockDefinition
}>()

const handleChange = (fieldName: string, e: any) => {
    props.blockContent.data[fieldName] = e.target.value
}


</script>

<style scoped></style>