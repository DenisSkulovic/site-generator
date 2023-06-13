import { computed } from "vue";
import type {ComputedRef} from "vue"
import getItemMapFromNestableConfig from "../../logic/nestable/getItemMapFromNestableConfig"
import {nestableConfig} from "../../state/nestableState";
import type { NestableItem } from "../../classes/NestableItem";

const nestableItemMap: ComputedRef<Map<string, NestableItem>> = computed(() => {
    return getItemMapFromNestableConfig(nestableConfig.config)
})

export default nestableItemMap