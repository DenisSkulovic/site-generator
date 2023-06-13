import {ref} from "vue"
import type {Ref} from "vue"

const set: Set<string> = new Set()
const loadingSet: Ref<Set<string>> = ref(set)

export default loadingSet