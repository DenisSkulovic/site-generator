import {ref} from "vue"
import type {Ref} from "vue"

const loadingSet: Ref<Set<string>> = ref(new Set())

export default loadingSet