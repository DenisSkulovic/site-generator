import type {PageContent} from "../../../../../page_cls_module/src"
import {reactive} from "vue"
import * as _ from "lodash"

/**
 * THIS SHOULD NOT BE TOUCHED DIRECTLY, HANDLED AUTOMATICALLY BY LOGIC RELATED TO NESTABLE
 */
const editPageContent: {value: PageContent | null} = reactive({
    value: null
})

// @ts-nocheck
window.editPageContent = editPageContent

export default editPageContent