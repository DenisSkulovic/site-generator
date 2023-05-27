import {GenerateFooterRequest, buildGenerateFooterRequest} from "../../page_cls_module"

export const buildAdminGenerateFooterRequest = (obj: any): AdminGenerateFooterRequest => {
    const generateRequest: GenerateFooterRequest = buildGenerateFooterRequest(obj.generateRequest)
    const res: AdminGenerateFooterRequest = new AdminGenerateFooterRequest(
        generateRequest
    )
    return res
} 

export class AdminGenerateFooterRequest {
    generateRequest: GenerateFooterRequest
    constructor(
        generateRequest: GenerateFooterRequest,
    ) {
        this.generateRequest = generateRequest
    }
}