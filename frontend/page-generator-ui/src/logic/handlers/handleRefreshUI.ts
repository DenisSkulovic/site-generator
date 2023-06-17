import useLoading from "@/composables/useLoading"
import {editPageConfig} from "@/state/pageConfigState"
import {editPageContent} from "@/state/pageContentState"
import type {PageHTMLObject, GeneratePageResponse} from "../../../../../page_cls_module/build_browser"
import { generatorService, pageHTMLObjectService } from "@/computed/services"

const handleRefreshUI = async () => {
    const {startLoadingThis, stopLoadingThis} = useLoading()
    startLoadingThis()
    if (!editPageConfig.value) throw new Error("editPageConfig.value cannot be undefined")
    if (!editPageContent.value) throw new Error("editPageContent.value cannot be undefined")

    const resp: GeneratePageResponse = await generatorService.value.generatePage(
        editPageConfig.value,
        editPageContent.value,
    )
    const pageHTMLObject: PageHTMLObject = resp.data
    pageHTMLObjectService.value.setPageHTMLObject(pageHTMLObject)
    pageHTMLObjectService.value.renderPageHTMLObject()
    stopLoadingThis()
}

export default handleRefreshUI