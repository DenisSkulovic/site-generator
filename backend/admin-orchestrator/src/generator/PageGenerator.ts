import axios from "axios"
import { FooterConfig, FooterContent, GenerateFooterRequest, GenerateFooterResponse, GenerateHeaderRequest, GenerateHeaderResponse, GeneratePageRequest, GeneratePageResponse, HeaderConfig, HeaderContent, PageConfig, PageContent } from "../../../../page_cls_module/src"
import getEnvVariable from "../logic/getEnvVariable"

export class PageGenerator {
    private baseUrl: string
    constructor(env: "dev" | "prod") {
        this.baseUrl = getEnvVariable("PAGE_GENERATOR")
    }

    async generateHeader(content: HeaderContent, config: HeaderConfig): Promise<GenerateHeaderResponse> {
        const url = `${this.baseUrl}/generate-header`
        const headers = {
            "Content-Type": "application/json"
        }
        const params = {}
        const body: GenerateHeaderRequest = new GenerateHeaderRequest(
            content,
            config,
        )
        const { data } = await axios.post(
            url,
            body,
            {
                params,
                headers,
            }
        )
        return data
    }
    
    async generateFooter(content: FooterContent, config: FooterConfig): Promise<GenerateFooterResponse> {
        const url = `${this.baseUrl}/generate-footer`
        const headers = {
            "Content-Type": "application/json"
        }
        const params = {}
        const body: GenerateFooterRequest = new GenerateFooterRequest(content, config)
        const { data } = await axios.post(
            url,
            body,
            {
                params,
                headers,
            }
        )
        return data
    }

    async generatePage(content: PageContent, config: PageConfig): Promise<GeneratePageResponse> {
        const url = `${this.baseUrl}/generate-page`
        const headers = {
            "Content-Type": "application/json"
        }
        const params = {}
        const body: GeneratePageRequest = new GeneratePageRequest(content, config)
        const { data } = await axios.post(
            url,
            body,
            {
                params,
                headers,
            }
        )
        return data
    }

}