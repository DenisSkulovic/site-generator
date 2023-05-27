import { computed } from "vue";
import type {ComputedRef} from "vue"
import getItemMapFromNestableConfig from "../../logic/nestable/getItemMapFromNestableConfig"
import nestableConfig from "../../state/nestable/nestableConfig";
import { NestableItem } from "../../classes/NestableItem";

const toDeleteNestableItemMap: ComputedRef<Map<string, NestableItem>> = computed(() => {
    return getItemMapFromNestableConfig(nestableConfig.toDelete)
})

export default toDeleteNestableItemMap