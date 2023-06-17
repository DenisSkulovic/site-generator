"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateAreaRequest = exports.buildGenerateAreaRequest = void 0;
const __1 = require("../../");
const buildGenerateAreaRequest = (obj) => {
    if (obj.clazz !== "GenerateAreaRequest")
        throw new Error("clazz cannot be anything other than 'GenerateAreaRequest'");
    const content = (0, __1.buildAreaContent)(obj.content);
    const config = (0, __1.buildAreaConfig)(obj.config);
    const generateAreaRequest = new GenerateAreaRequest(content, config);
    return generateAreaRequest;
};
exports.buildGenerateAreaRequest = buildGenerateAreaRequest;
class GenerateAreaRequest {
    constructor(content, config) {
        this.content = content;
        this.config = config;
        this.clazz = this.constructor.name;
    }
}
exports.GenerateAreaRequest = GenerateAreaRequest;
//# sourceMappingURL=GenerateAreaRequest.js.map