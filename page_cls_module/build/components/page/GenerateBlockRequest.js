import { buildBlockConfig, buildBlockContent } from "../../";
export const buildGenerateBlockRequest = (obj) => {
    if (obj.clazz !== "GenerateBlockRequest")
        throw new Error("clazz cannot be anything other than 'GenerateBlockRequest'");
    const content = buildBlockContent(obj.content);
    const config = buildBlockConfig(obj.config);
    const generateBlockRequest = new GenerateBlockRequest(content, config);
    return generateBlockRequest;
};
export class GenerateBlockRequest {
    constructor(content, config) {
        this.content = content;
        this.config = config;
        this.clazz = this.constructor.name;
    }
}
//# sourceMappingURL=GenerateBlockRequest.js.map