"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateBlockRequest = exports.buildGenerateBlockRequest = void 0;
const __1 = require("../../");
const buildGenerateBlockRequest = (obj) => {
    if (obj.clazz !== "GenerateBlockRequest")
        throw new Error("clazz cannot be anything other than 'GenerateBlockRequest'");
    const content = (0, __1.buildBlockContent)(obj.content);
    const config = (0, __1.buildBlockConfig)(obj.config);
    const generateBlockRequest = new GenerateBlockRequest(content, config);
    return generateBlockRequest;
};
exports.buildGenerateBlockRequest = buildGenerateBlockRequest;
class GenerateBlockRequest {
    constructor(content, config) {
        this.content = content;
        this.config = config;
        this.clazz = this.constructor.name;
    }
}
exports.GenerateBlockRequest = GenerateBlockRequest;
//# sourceMappingURL=GenerateBlockRequest.js.map