import {computed} from "vue"
import type {ComputedRef} from "vue"
import editedAreaContentMap from "./editedAreaContentMap"
import newAreaContentMap from "../../state/pageContent/newAreaContentMap"

const allAreaContentIdSet: ComputedRef<Set<string>> = computed(() => {
    const set: Set<string> = new Set()

    Array.from(editedAreaContentMap.value.keys()).forEach((uuid: string) => {
        set.add(uuid)
    })
    Array.from(newAreaContentMap.value.keys()).forEach((uuid: string) => {
        set.add(uuid)
    })

    return set
})

export default allAreaContentIdSet