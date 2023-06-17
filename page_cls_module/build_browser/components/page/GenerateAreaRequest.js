import { buildAreaContent, buildAreaConfig } from "../../";
export const buildGenerateAreaRequest = (obj) => {
    if (obj.clazz !== "GenerateAreaRequest")
        throw new Error("clazz cannot be anything other than 'GenerateAreaRequest'");
    const content = buildAreaContent(obj.content);
    const config = buildAreaConfig(obj.config);
    const generateAreaRequest = new GenerateAreaRequest(content, config);
    return generateAreaRequest;
};
export class GenerateAreaRequest {
    constructor(content, config) {
        this.content = content;
        this.config = config;
        this.clazz = this.constructor.name;
    }
}
//# sourceMappingURL=GenerateAreaRequest.js.map