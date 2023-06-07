import useLoading from "@/composables/useLoading"
import editPageHTMLObject from "@/state/pageHTMLObject/editPageHTMLObject"
import editPageConfig from "@/state/pageConfig/editPageConfig"
import editPageContent from "@/state/pageContent/editPageContent"
import generatePage from "@/api/pageGenerator/generatePage"
import type {PageHTMLObject, GeneratePageResponse} from "../../../../../page_cls_module"
import renderPageHTMLObject from "@/logic/generation/renderPageHTMLObject"

const handleRefreshUI = async () => {
    const {startLoadingThis, stopLoadingThis} = useLoading()
    startLoadingThis()
    if (!editPageConfig.value) throw new Error("editPageConfig.value cannot be undefined")
    if (!editPageContent.value) throw new Error("editPageContent.value cannot be undefined")
    const resp: GeneratePageResponse = await generatePage(
        editPageConfig.value,
        editPageContent.value,
    )
    const pageHTMLObject: PageHTMLObject = resp.data
    editPageHTMLObject.value = pageHTMLObject
    renderPageHTMLObject(editPageHTMLObject.value)
    stopLoadingThis()
}

export default handleRefreshUI