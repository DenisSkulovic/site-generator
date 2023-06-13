import {computed} from "vue"
import type {ComputedRef} from "vue"
import editedAreaConfigMap from "./editedAreaConfigMap"
import {newAreaConfigMap} from "../../state/pageConfigState"

const allAreaConfigIdSet: ComputedRef<Set<string>> = computed(() => {
    const set: Set<string> = new Set()

    Array.from(editedAreaConfigMap.value.keys()).forEach((uuid: string) => {
        set.add(uuid)
    })
    Array.from(newAreaConfigMap.value.keys()).forEach((uuid: string) => {
        set.add(uuid)
    })

    return set
})

export default allAreaConfigIdSet