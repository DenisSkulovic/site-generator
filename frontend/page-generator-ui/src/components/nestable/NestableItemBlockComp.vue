<template>
    <div class="draggable-item d-flex flex-row nowrap justify-content-between p-2" style="gap: 10px;" ref="block">
        <div>
            <div> {{ item.blockConfig_edit.blockName }} </div>
        </div>
        <div class="d-flex flex-row nowrpas" style="gap: 3px;">
            <div>
                <select class="form-select" :value="item.blockConfig_edit.blockTemplateName" :options="blockTemplateNames"
                    @change="(e) => handleChangeTemplate(e)">
                    <option :selected="blockTemplate === item.blockConfig_edit.blockTemplateName"
                        v-for="(blockTemplate, blockTemplate_i) in blockTemplateNames" :key="blockTemplate_i">
                        {{ blockTemplate }}
                    </option>
                </select>
            </div>
            <div>
                <button class="btn btn-primary" @click.stop="handleDisplayClick">
                    <SearchSvg></SearchSvg>
                </button>
            </div>
            <div>
                <button class="btn btn-danger" @click.stop="handleDeleteClick">
                    <TrashSvg></TrashSvg>
                </button>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { computed, ref, watch } from "vue"
import type { ComputedRef, Ref } from "vue"
import { NestableItemBlock } from "../../classes/NestableItemBlock";
import SearchSvg from "../svg/SearchSvg.vue";
import TrashSvg from "../svg/TrashSvg.vue";
import { BlockTemplateEnum } from '../../../../../page_cls_module/src';
import { useElementHover } from '@vueuse/core'

const props = defineProps<{
    item: NestableItemBlock
}>()

const handleDisplayClick = () => {
    props.item.display()
}
const handleDeleteClick = () => {
    props.item.moveItemToDelete()
}
const handleChangeTemplate = (e: any) => {
    const template: BlockTemplateEnum = e.target.value
    props.item.blockConfig_edit.blockTemplateName = template
    props.item.setDefaultFields()
}

const blockTemplateNames: ComputedRef<BlockTemplateEnum[]> = computed(() => {
    return Object.values(BlockTemplateEnum)
})

const timeout: Ref<number> = ref(NaN)
const block = ref()
const isHovered = useElementHover(block)


const handleHoverScroll = () => {
    clearTimeout(timeout.value)
    timeout.value = setTimeout(() => {
        if (!isHovered.value) return
        const el = document.querySelector(`[data-block-uuid="${props.item.id}"]`)
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" })
        }
    }, 500)
}
watch(
    () => isHovered.value,
    (newVal: boolean) => {
        const el = document.querySelector(`[data-block-uuid="${props.item.id}"]`)
        if (el) {
            if (newVal) {
                el.classList.add("currently-hovered-block")
            } else {
                el.classList.remove("currently-hovered-block")
            }
        }

        handleHoverScroll()
    }
)
</script>


<style scoped>
.draggable-item {
    border: 1px solid yellow;
    background-color: rgba(150, 115, 0, 0.2);
}

.used-areas.isFull {
    background: transparent;
}

.used-areas.isAvailable {
    background: green;
}

.used-areas.isTooMuch {
    background: red;
}
</style>