import {computed} from "vue"
import type {ComputedRef} from "vue"
import editedBlockConfigMap from "./editedBlockConfigMap"
import newBlockConfigMap from "../../state/pageConfig/newBlockConfigMap"

const allBlockConfigIdSet: ComputedRef<Set<string>> = computed(() => {
    const set: Set<string> = new Set()

    Array.from(editedBlockConfigMap.value.keys()).forEach((uuid: string) => {
        set.add(uuid)
    })
    Array.from(newBlockConfigMap.value.keys()).forEach((uuid: string) => {
        set.add(uuid)
    })

    return set
})

export default allBlockConfigIdSet