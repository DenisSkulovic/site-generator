<template>
    <div class="draggable-item d-flex flex-row nowrap justify-content-between p-2" style="gap: 10px;"  ref="area">
        <div>
            <div> {{ item.areaConfig_edit.areaName }} </div>
            <SlotAvailability :slots-used="item.slotsUsed" :slots-max="item.slotsMax"></SlotAvailability>
        </div>
        <div class="d-flex flex-row nowrap" style="gap: 3px;">
            <div>
                <select class="form-select" :value="item.areaConfig_edit.areaTemplateName"
                    @change="(e) => handleChangeAreaTemplate(e)">
                    <option :selected="areaTemplate === item.areaConfig_edit.areaTemplateName"
                        v-for="(areaTemplate, areaTemplate_i) in areaTemplateNames" :key="areaTemplate_i">
                        {{ areaTemplate }}
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
            <div>
                <button :disabled="!!item.slotsMax && !item.isHaveSlotsAvailable" class="btn btn-secondary" @click.stop="handleAddAreaClick">
                    + Area
                </button>
            </div>
            <div>
                <button :disabled="!!item.slotsMax && !item.isHaveSlotsAvailable" class="btn btn-secondary" @click.stop="handleAddBlockClick">
                    + Block
                </button>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { NestableItemArea } from "../../classes/NestableItemArea";
import { computed, watch, ref } from "vue";
import type { ComputedRef, Ref } from "vue";
import SlotAvailability from "../common/SlotAvailability.vue";
import { AreaLayoutEnum } from "../../../../../page_cls_module"
import SearchSvg from "../svg/SearchSvg.vue";
import TrashSvg from "../svg/TrashSvg.vue";
import { useElementHover } from '@vueuse/core'

const props = defineProps<{
    item: NestableItemArea
}>()

const handleDisplayClick = () => {
    props.item.display()
}
const handleDeleteClick = () => {
    props.item.moveItemToDelete()
}

const areaTemplateNames: ComputedRef<AreaLayoutEnum[]> = computed(() => {
    return Object.values(AreaLayoutEnum)
})

// handlers
const handleChangeAreaTemplate = (e: any) => {
    console.log(`template change`, e.target.value)
    props.item.areaConfig_edit.areaTemplateName = e.target.value
}
const handleAddAreaClick = () => {
    if (!!props.item.slotsMax && !props.item.isHaveSlotsAvailable) throw new Error("cannot add new area")
    props.item.addNewArea()
}
const handleAddBlockClick = () => {
    if (!!props.item.slotsMax && !props.item.isHaveSlotsAvailable) throw new Error("cannot add new block")
    props.item.addNewBlock()
}

const timeout: Ref<number> = ref(NaN)
const area = ref()
const isHovered = useElementHover(area)

const handleHoverScroll = () => {
    clearTimeout(timeout.value)
    timeout.value = setTimeout(() => {
        if (!isHovered.value) return
        const el = document.querySelector(`[data-area-uuid="${props.item.id}"]`)
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" })
        }
    }, 500)
}
watch(
    () => isHovered.value,
    (newVal: boolean) => {
        const el = document.querySelector(`[data-area-uuid="${props.item.id}"]`)
        if (el) {
            if (newVal) {
                el.classList.add("currently-hovered-area")
            } else {
                el.classList.remove("currently-hovered-area")
            }
        }

        handleHoverScroll()
    }
)
</script>


<style scoped>
.draggable-item {
    border: 1px solid red;
    background-color: rgba(150, 0, 0, 0.2);
}
</style>