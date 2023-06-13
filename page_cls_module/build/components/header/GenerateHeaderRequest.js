import { buildHeaderConfig, buildHeaderContent } from "../../";
export const buildGenerateHeaderRequest = (obj) => {
    if (obj.clazz !== "GenerateHeaderRequest")
        throw new Error("clazz cannot be anything other than 'GenerateHeaderRequest'");
    const content = buildHeaderContent(obj.content);
    const config = buildHeaderConfig(obj.config);
    const generateBlockRequest = new GenerateHeaderRequest(content, config);
    return generateBlockRequest;
};
export class GenerateHeaderRequest {
    constructor(content, config) {
        this.content = content;
        this.config = config;
        this.clazz = this.constructor.name;
    }
}
//# sourceMappingURL=GenerateHeaderRequest.js.map