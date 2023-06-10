import {reactive, ref} from "vue"
import type {NestableItem} from "@/classes/NestableItem"
import { NestableConfig } from "@/classes/NestableConfig"

export const currentNestableItem: {value: NestableItem | null} = reactive({
    value: null
})

export const nestableConfig: {
    config: NestableConfig,
    toDelete: NestableConfig,
} = reactive({
    config: new NestableConfig(),
    toDelete: new NestableConfig(),
})