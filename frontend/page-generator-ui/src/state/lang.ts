import {ref} from "vue"
import type {Ref} from "vue"
import type { LangEnum } from "../../../../page_cls_module/src"

const lang: Ref<LangEnum | null> = ref(null)

export default lang