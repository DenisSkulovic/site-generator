"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateFooterRequest = exports.buildGenerateFooterRequest = void 0;
const __1 = require("../../");
const buildGenerateFooterRequest = (obj) => {
    if (obj.clazz !== "GenerateFooterRequest")
        throw new Error("clazz cannot be anything other than 'GenerateFooterRequest'");
    const content = (0, __1.buildFooterContent)(obj.content);
    const config = (0, __1.buildFooterConfig)(obj.config);
    const generateBlockRequest = new GenerateFooterRequest(content, config);
    return generateBlockRequest;
};
exports.buildGenerateFooterRequest = buildGenerateFooterRequest;
class GenerateFooterRequest {
    constructor(content, config) {
        this.content = content;
        this.config = config;
        this.clazz = this.constructor.name;
    }
}
exports.GenerateFooterRequest = GenerateFooterRequest;
//# sourceMappingURL=GenerateFooterRequest.js.map