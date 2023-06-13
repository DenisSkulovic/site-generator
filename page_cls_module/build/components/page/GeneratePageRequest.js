import { buildPageContent, buildPageConfig } from "../../";
export const buildGeneratePageRequest = (obj) => {
    if (obj.clazz !== "GeneratePageRequest")
        throw new Error("clazz cannot be anything other than 'GeneratePageRequest'");
    const content = buildPageContent(obj.content);
    const config = buildPageConfig(obj.config);
    const generatePageRequest = new GeneratePageRequest(content, config);
    return generatePageRequest;
};
export class GeneratePageRequest {
    constructor(content, config) {
        this.content = content;
        this.config = config;
        this.clazz = this.constructor.name;
    }
}
//# sourceMappingURL=GeneratePageRequest.js.map