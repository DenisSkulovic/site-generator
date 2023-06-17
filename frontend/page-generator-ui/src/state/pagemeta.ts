import {ref} from "vue"
import type {Ref} from "vue"
import type { Pagemeta } from "../../../../admin_cls_module/src"

const pagemeta: Ref<Pagemeta | null> = ref(null)

export default pagemeta