import type {PageContent} from "../../../../../page_cls_module/src"
import {reactive} from "vue"
import * as _ from "lodash"

const currentPageContent: {value: PageContent | null} = reactive({
    value: null
})

export default currentPageContent