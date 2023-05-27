<template>
    <div>
        <div
            class="d-flex flex-row nowrap justify-content-between align-items-center expandable-handle p-3"
            @click.stop="handleToggleClick"
            role="button"
        >
            <div class="section-title">
                <slot name="title" />
            </div>
            <ChevronDownSvg
                :width="17"
                :height="9"
                :style="{
                    transform: active
                        ? 'rotate(0deg)'
                        : 'rotate(-90deg)',
                }"
            />
        </div>
        <div class="expandable-content p-3" v-show="active">
            <slot name="content" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import ChevronDownSvg from './svg/ChevronDownSvg.vue'

defineProps<{
    active: boolean
}>()
const emit = defineEmits<{
    (e: 'toggleClick'): void
}>()

// handlers
const handleToggleClick = () => {
    emit('toggleClick')
}
</script>

<style lang="scss" scoped>

.expandable-handle {
    background-color: rgba(128, 128, 128, 0.5);
    border: 1px solid gray;
}
.expandable-content {
    border: 1px dashed lightgray;
    background-color: rgba(211, 211, 211, 0.5);

}
</style>
