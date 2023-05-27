import {computed} from "vue"
import type {ComputedRef} from "vue"
import editedBlockContentMap from "./editedBlockContentMap"
import newBlockContentMap from "../../state/pageContent/newBlockContentMap"

const allBlockContentIdSet: ComputedRef<Set<string>> = computed(() => {
    const set: Set<string> = new Set()

    Array.from(editedBlockContentMap.value.keys()).forEach((uuid: string) => {
        set.add(uuid)
    })
    Array.from(newBlockContentMap.value.keys()).forEach((uuid: string) => {
        set.add(uuid)
    })

    return set
})

export default allBlockContentIdSet