import { reactive } from "vue"

const idToIdMap: { value: Map<string, string> } = reactive({
    value: new Map()
})

export default idToIdMap