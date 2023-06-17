<!-- <template>
    <v-card class="d-flex justify-space-between pa-2" ref="block">
        <v-row no-gutters>
            <v-col cols="8">
                <v-row align="center">
                    <v-text-field v-if="isEditingName" :value="item.blockConfig_edit.blockName" @input="handleChangeName"
                        outlined dense />
                    <v-btn icon small @click.stop="isEditingName = !isEditingName">
                        <v-icon>{{ isEditingName ? 'mdi-check' : 'mdi-pencil' }}</v-icon>
                    </v-btn>
                </v-row>
            </v-col>
            <v-col cols="4">
                <v-select class="my-0" :items="blockTemplateNames" v-model="item.blockConfig_edit.blockTemplateName"
                    @change="handleChangeTemplate" outlined dense />
                <v-btn icon small @click.stop="handleDisplayClick">
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>
                <v-btn icon small @click.stop="handleDeleteClick">
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
            </v-col>
        </v-row>
    </v-card>
</template> -->

<template>
    <div class="draggable-item d-flex flex-row nowrap justify-content-between p-2" style="gap: 10px;" ref="block">
        <div>
            <div class="text-nowrap" v-if="!isEditingName">
                    <span>{{ item.blockConfig_edit.blockName }}</span>
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
                        :value="item.blockConfig_edit.blockName" @input="handleChangeName" />
                    <button style="border: none; background-color: transparent;" @click.stop="isEditingName = !isEditingName">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-check-lg" viewBox="0 0 16 16">
                            <path
                                d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                        </svg>
                    </button>
                </div>
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
import type { NestableItemBlock } from "../../classes/NestableItemBlock";
import SearchSvg from "../svg/SearchSvg.vue";
import TrashSvg from "../svg/TrashSvg.vue";
import { BlockTemplateEnum } from '../../../../../page_cls_module/build_browser';
import { useElementHover } from '@vueuse/core'

const isEditingName: Ref<boolean> = ref(false)

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
    }, 500) as any
}
const handleChangeName = (e: any) => {
    props.item.blockConfig_edit.blockName = e.target.value
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