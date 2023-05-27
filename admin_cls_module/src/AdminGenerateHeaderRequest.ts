import {GenerateHeaderRequest, buildGenerateHeaderRequest} from "../../page_cls_module"

export const buildAdminGenerateHeaderRequest = (obj: any): AdminGenerateHeaderRequest => {
    const generateRequest: GenerateHeaderRequest = buildGenerateHeaderRequest(obj.generateRequest)
    const res: AdminGenerateHeaderRequest = new AdminGenerateHeaderRequest(
        generateRequest
    )
    return res
} 

export class AdminGenerateHeaderRequest {
    generateRequest: GenerateHeaderRequest
    constructor(
        generateRequest: GenerateHeaderRequest,
    ) {
        this.generateRequest = generateRequest
    }
}