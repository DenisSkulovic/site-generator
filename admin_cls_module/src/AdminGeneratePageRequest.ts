import {GeneratePageRequest, buildGeneratePageRequest} from "../../page_cls_module"

export const buildAdminGeneratePageRequest = (obj: any): AdminGeneratePageRequest => {
    const generateRequest: GeneratePageRequest = buildGeneratePageRequest(obj.generateRequest)
    const res: AdminGeneratePageRequest = new AdminGeneratePageRequest(
        obj.pageUrl,
        generateRequest,
        Boolean(obj.isClearCache),
    )
    return res
}

export class AdminGeneratePageRequest {
    pageUrl: string
    generateRequest: GeneratePageRequest
    isClearCache: boolean
    constructor(
        pageUrl: string,
        generateRequest: GeneratePageRequest,
        isClearCache: boolean,
    ) {
        this.pageUrl = pageUrl
        this.generateRequest = generateRequest
        this.isClearCache = isClearCache
    }
}
