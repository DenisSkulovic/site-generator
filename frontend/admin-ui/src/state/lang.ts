import { LangEnum } from "../../../../page_cls_module/src";
import {ref} from "vue"
import type {Ref} from "vue"

const lang: Ref<LangEnum> = ref(LangEnum.LT)

export default lang