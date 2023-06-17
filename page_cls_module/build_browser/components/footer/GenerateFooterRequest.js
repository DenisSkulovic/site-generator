import { buildFooterConfig, buildFooterContent } from "../../";
export const buildGenerateFooterRequest = (obj) => {
    if (obj.clazz !== "GenerateFooterRequest")
        throw new Error("clazz cannot be anything other than 'GenerateFooterRequest'");
    const content = buildFooterContent(obj.content);
    const config = buildFooterConfig(obj.config);
    const generateBlockRequest = new GenerateFooterRequest(content, config);
    return generateBlockRequest;
};
export class GenerateFooterRequest {
    constructor(content, config) {
        this.content = content;
        this.config = config;
        this.clazz = this.constructor.name;
    }
}
//# sourceMappingURL=GenerateFooterRequest.js.map