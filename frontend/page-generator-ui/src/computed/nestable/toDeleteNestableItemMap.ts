import { computed } from "vue";
import type {ComputedRef} from "vue"
import {nestableConfig} from "../../state/nestableState";
import type { NestableItem } from "../../classes/NestableItem";
import { nestableService } from "../services";

const toDeleteNestableItemMap: ComputedRef<Map<string, NestableItem>> = computed(() => {
    return nestableService.value.getItemMapFromNestableConfig(nestableConfig.toDelete)
})

export default toDeleteNestableItemMap