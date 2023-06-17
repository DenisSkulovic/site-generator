"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneratePageRequest = exports.buildGeneratePageRequest = void 0;
const __1 = require("../../");
const buildGeneratePageRequest = (obj) => {
    if (obj.clazz !== "GeneratePageRequest")
        throw new Error("clazz cannot be anything other than 'GeneratePageRequest'");
    const content = (0, __1.buildPageContent)(obj.content);
    const config = (0, __1.buildPageConfig)(obj.config);
    const generatePageRequest = new GeneratePageRequest(content, config);
    return generatePageRequest;
};
exports.buildGeneratePageRequest = buildGeneratePageRequest;
class GeneratePageRequest {
    constructor(content, config) {
        this.content = content;
        this.config = config;
        this.clazz = this.constructor.name;
    }
}
exports.GeneratePageRequest = GeneratePageRequest;
//# sourceMappingURL=GeneratePageRequest.js.map