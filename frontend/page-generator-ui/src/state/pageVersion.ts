import {ref} from "vue"
import type {Ref} from "vue"
import type { PageVersion } from "../../../../page_cls_module/build_browser"

const pageVersion: Ref<PageVersion | null> = ref(null)

export default pageVersion