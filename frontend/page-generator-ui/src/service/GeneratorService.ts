import axios from "axios"
import { AdminService } from "./AdminService"
import { GenerateAreaRequest, GenerateAreaResponse, AreaConfig, AreaContent, BlockConfig, BlockContent, BlockHTMLObject, GenerateBlockRequest, GenerateBlockResponse, GeneratePageRequest, GeneratePageResponse, PageConfig, PageContent, PageHTMLObject, buildBlockHTMLObject, buildPageHTMLObject } from "../../../../page_cls_module/build_browser"
import { buildAreaHTMLObject, AreaHTMLObject } from "../../../../page_cls_module/build_browser"

export type S3Path = string
export class GeneratorService extends AdminService {
    constructor(adminUrl: string) {
        super(adminUrl)
    }

    async generatePage(
        pageConfig: PageConfig,
        pageContent: PageContent,
    ): Promise<GeneratePageResponse> {
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
        const { data } = await axios.post(
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

    async generateArea(
        areaConfig: AreaConfig,
        areaContent: AreaContent,
    ): Promise<GenerateAreaResponse> {
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
        const url = `${VITE_APP_PAGE_GENERATOR_LAMBDA_URL}/generate-area`
        const { data } = await axios.post(
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

    async generateBlock(
        blockConfig: BlockConfig,
        blockContent: BlockContent,
    ): Promise<GenerateBlockResponse> {
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
        const { data } = await axios.post(
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

}
