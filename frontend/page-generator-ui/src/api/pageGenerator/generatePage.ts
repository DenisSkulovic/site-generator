import axios from "axios"

import {GeneratePageRequest, GeneratePageResponse, PageConfig, PageContent, PageHTMLObject} from "../../../../../page_cls_module"
import {buildPageHTMLObject} from "../../../../../page_cls_module"

const generatePage = async (
    pageConfig: PageConfig,
    pageContent: PageContent,
): Promise<GeneratePageResponse> => {
    const VITE_APP_PAGE_GENERATOR_LAMBDA_URL = import.meta.env.VITE_APP_PAGE_GENERATOR_LAMBDA_URL
    if (!VITE_APP_PAGE_GENERATOR_LAMBDA_URL) throw new Error("VITE_APP_PAGE_GENERATOR_LAMBDA_URL is a mandatory ENV param")
    const headers = {
        "Content-Type": "application/json",
    }
    const params = {

    }
    const body: GeneratePageRequest = new GeneratePageRequest(
        pageContent,
        pageConfig,
    )
    const url = `${VITE_APP_PAGE_GENERATOR_LAMBDA_URL}/generate-page`
    const {data} = await axios.post(
        url,
        body,
        {
            headers,
            params,
        }
    )
    const htmlObject: PageHTMLObject = buildPageHTMLObject(data.data)
    const resp: GeneratePageResponse = new GeneratePageResponse(
        htmlObject
    )
    return resp
}

export default generatePage