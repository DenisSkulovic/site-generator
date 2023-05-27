import type { NestableConfig } from "../../classes/NestableConfig";
import type { NestableItem } from "../../classes/NestableItem";

const processItem = (item: NestableItem, map: Map<string, NestableItem>) => {
    map.set(item.id, item)
    item.children.forEach((subitem: NestableItem) => {
        processItem(subitem, map)
    })
}

const getItemMapFromNestableConfig = (config: NestableConfig) => {
    const map: Map<string, NestableItem> = new Map()

    config.forEach((item: NestableItem) => {
        processItem(item, map)
    });

    return map
}

export default getItemMapFromNestableConfig