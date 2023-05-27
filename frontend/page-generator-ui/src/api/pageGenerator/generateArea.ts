import axios from "axios"

import {GenerateAreaRequest, GenerateAreaResponse, AreaConfig, AreaContent} from "../../../../../page_cls_module"
import {buildAreaHTMLObject, AreaHTMLObject} from "../../../../../page_cls_module"

const generateArea = async (
    areaConfig: AreaConfig,
    areaContent: AreaContent,
): Promise<GenerateAreaResponse> => {
    const VITE_APP_PAGE_GENERATOR_LAMBDA_URL = import.meta.env.VITE_APP_PAGE_GENERATOR_LAMBDA_URL
    if (!VITE_APP_PAGE_GENERATOR_LAMBDA_URL) throw new Error("VITE_APP_PAGE_GENERATOR_LAMBDA_URL is a mandatory ENV param")
    const headers = {
        "Content-Type": "application/json",
    }
    const params = {

    }
    const body: GenerateAreaRequest = new GenerateAreaRequest(
        areaContent,
        areaConfig,
    )
    const url = `${VITE_APP_PAGE_GENERATOR_LAMBDA_URL}/page-generator/generate-area`
    const {data} = await axios.post(
        url,
        body,
        {
            headers,
            params,
        }
    )
    const htmlObject: AreaHTMLObject = buildAreaHTMLObject(data.data)
    const resp: GenerateAreaResponse = new GenerateAreaResponse(
        htmlObject
    )
    return resp
}

export default generateArea