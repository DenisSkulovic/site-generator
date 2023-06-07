import type { PageConfig, AreaConfig } from "../../../../../page_cls_module/src"
import currentPageConfig from "../../state/pageConfig/currentPageConfig"
import editPageConfig from "../../state/pageConfig/editPageConfig"
import * as _ from "lodash"

const resetPageConfig = () => {
    console.log(`resetPageConfig`)
    const areaConfigArr: AreaConfig[] = editPageConfig.value?.areaConfigArr || []
    const newConfig: PageConfig | null = _.cloneDeep(currentPageConfig.value)
    if (!newConfig) throw new Error("newConfig cannot be undefined")
    newConfig.areaConfigArr = areaConfigArr
    editPageConfig.value = newConfig
}

export default resetPageConfig 