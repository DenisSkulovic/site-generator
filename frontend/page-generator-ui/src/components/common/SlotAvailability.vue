<template>
    <div v-if="slotsMax" class="used-areas" :class="usedSlotsClass">
        <span>{{ slotsUsed }}</span>
        <span>{{ "/" }}</span>
        <span>{{ slotsMax }}</span>
    </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import type { ComputedRef } from "vue";

const props = defineProps<{
    slotsUsed: number
    slotsMax: number
}>()

const usedSlotsClass: ComputedRef<string> = computed(() => {
    if (!props.slotsMax) return ""
    if (props.slotsUsed === props.slotsMax) return "isFull"
    else if (props.slotsUsed < props.slotsMax) return "isAvailable"
    else if (props.slotsUsed > props.slotsMax) return "isTooMuch"
    else throw new Error("something went wrong in your logic here, mister")
})
</script>

<style scoped>
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