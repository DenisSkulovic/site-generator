import {reactive} from "vue"
import type {AreaConfig, AreaContent, BlockConfig, BlockContent, PageConfig, PageContent, PageHTMLObject} from "../../../../page_cls_module/src"

const lastRenderedData: {
    config: PageConfig | null,
    content: PageContent | null,
    htmlObject: PageHTMLObject | null,
    areaConfigMap: Map<string, AreaConfig> | null,
    areaContentMap: Map<string, AreaContent> | null,
    blockConfigMap: Map<string, BlockConfig> | null,
    blockContentMap: Map<string, BlockContent> | null,
} = reactive({
    config : null,
    content : null,
    htmlObject : null,
    areaConfigMap : null,
    areaContentMap : null,
    blockConfigMap : null,
    blockContentMap : null,
})

export default lastRenderedData