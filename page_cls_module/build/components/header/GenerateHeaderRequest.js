"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateHeaderRequest = exports.buildGenerateHeaderRequest = void 0;
const __1 = require("../../");
const buildGenerateHeaderRequest = (obj) => {
    if (obj.clazz !== "GenerateHeaderRequest")
        throw new Error("clazz cannot be anything other than 'GenerateHeaderRequest'");
    const content = (0, __1.buildHeaderContent)(obj.content);
    const config = (0, __1.buildHeaderConfig)(obj.config);
    const generateBlockRequest = new GenerateHeaderRequest(content, config);
    return generateBlockRequest;
};
exports.buildGenerateHeaderRequest = buildGenerateHeaderRequest;
class GenerateHeaderRequest {
    constructor(content, config) {
        this.content = content;
        this.config = config;
        this.clazz = this.constructor.name;
    }
}
exports.GenerateHeaderRequest = GenerateHeaderRequest;
//# sourceMappingURL=GenerateHeaderRequest.js.map