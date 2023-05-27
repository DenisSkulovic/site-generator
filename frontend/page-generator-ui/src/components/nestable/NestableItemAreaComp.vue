<template>
    <div class="draggable-item d-flex flex-row nowrap justify-content-between p-2" style="gap: 10px;" ref="area">
        <div>
            <div role="button" class="d-flex flex-row" @click="() => item.toggleCollapseExpand()">
                <ToggleChevron :isCollapsed="item.isCollapsed" @click.stop="() => item.toggleCollapseExpand()">
                </ToggleChevron>
                <div class="text-nowrap" v-if="!isEditingName">
                    <span>{{ item.areaConfig_edit.areaName }}</span>
                    <button style="border: none; background-color: transparent;" @click.stop="isEditingName = !isEditingName">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-pencil" viewBox="0 0 16 16">
                            <path
                                d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                        </svg>
                    </button>
                </div>
                <div class="d-flex flex-row text-nowrap" v-else>
                    <input @dragstart="(e) => { e.preventDefault(); e.stopPropagation(); }" @click.stop="() => { }"
                        :value="item.areaConfig_edit.areaName" @input="handleChangeName" />
                    <button style="border: none; background-color: transparent;" @click.stop="isEditingName = !isEditingName">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-check-lg" viewBox="0 0 16 16">
                            <path
                                d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                        </svg>
                    </button>
                </div>
            </div>
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
                <AddAreaBtn :item="item" @click="handleAddAreaClick"></AddAreaBtn>
            </div>
            <div>
                <AddBlockBtn :item="item" @click="handleAddBlockClick"></AddBlockBtn>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import type { NestableItemArea } from "../../classes/NestableItemArea";
import { computed, watch, ref } from "vue";
import type { ComputedRef, Ref } from "vue";
import SlotAvailability from "../common/SlotAvailability.vue";
import ToggleChevron from "./ToggleChevron.vue";
import { AreaLayoutEnum } from "../../../../../page_cls_module"
import SearchSvg from "../svg/SearchSvg.vue";
import TrashSvg from "../svg/TrashSvg.vue";
import { useElementHover } from '@vueuse/core'
import AddAreaBtn from "../AddAreaBtn.vue"
import AddBlockBtn from "../AddBlockBtn.vue"

const props = defineProps<{
    item: NestableItemArea
}>()

const isEditingName: Ref<boolean> = ref(false)

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
const handleChangeName = (e: any) => {
    props.item.areaConfig_edit.areaName = e.target.value
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
}</style>