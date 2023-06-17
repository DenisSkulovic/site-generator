import axios from "axios"

import {GenerateBlockRequest, GenerateBlockResponse, BlockConfig, BlockContent} from "../../../../../page_cls_module/build_browser"
import {buildBlockHTMLObject, BlockHTMLObject} from "../../../../../page_cls_module/build_browser"

const generateBlock = async (
    blockConfig: BlockConfig,
    blockContent: BlockContent,
): Promise<GenerateBlockResponse> => {
    const VITE_APP_PAGE_GENERATOR_LAMBDA_URL = import.meta.env.VITE_APP_PAGE_GENERATOR_LAMBDA_URL
    if (!VITE_APP_PAGE_GENERATOR_LAMBDA_URL) throw new Error("VITE_APP_PAGE_GENERATOR_LAMBDA_URL is a mandatory ENV param")
    const headers = {
        "Content-Type": "application/json",
    }
    const params = {

    }
    const body: GenerateBlockRequest = new GenerateBlockRequest(
        blockContent,
        blockConfig,
    )
    const url = `${VITE_APP_PAGE_GENERATOR_LAMBDA_URL}/generate-block`
    const {data} = await axios.post(
        url,
        body,
        {
            headers,
            params,
        }
    )
    const htmlObject: BlockHTMLObject = buildBlockHTMLObject(data)
    const resp: GenerateBlockResponse = new GenerateBlockResponse(
        htmlObject
    )
    return resp
}

export default generateBlock