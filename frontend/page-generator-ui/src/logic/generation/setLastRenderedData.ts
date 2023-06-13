import lastRenderedData from "@/state/lastRenderedData"
import {cloneDeep} from "lodash"
import editedAreaConfigMap from "@/computed/pageConfig/editedAreaConfigMap"
import editedBlockConfigMap from "@/computed/pageConfig/editedBlockConfigMap"
import editedAreaContentMap from "@/computed/pageContent/editedAreaContentMap"
import editedBlockContentMap from "@/computed/pageContent/editedBlockContentMap"
import {editPageConfig} from "@/state/pageConfigState"
import {editPageContent} from "@/state/pageContentState"
import {editPageHTMLObject} from "@/state/pageHTMLObjectState"

const setLastRenderedData = () => {
    console.log(`setLastRenderedData`)
    lastRenderedData.areaConfigMap = cloneDeep(editedAreaConfigMap.value)
    lastRenderedData.areaContentMap = cloneDeep(editedAreaContentMap.value)
    lastRenderedData.blockConfigMap = cloneDeep(editedBlockConfigMap.value)
    lastRenderedData.blockContentMap = cloneDeep(editedBlockContentMap.value)
    lastRenderedData.config = cloneDeep(editPageConfig.value)
    lastRenderedData.content = cloneDeep(editPageContent.value)
    lastRenderedData.htmlObject = cloneDeep(editPageHTMLObject.value)
}
export default setLastRenderedData