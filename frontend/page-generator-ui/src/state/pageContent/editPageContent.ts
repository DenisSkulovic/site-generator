import type {PageContent} from "../../../../../page_cls_module/src"
import {reactive} from "vue"
import * as _ from "lodash"

const editPageContent: {value: PageContent | null} = reactive({
    value: null
})

export default editPageContent