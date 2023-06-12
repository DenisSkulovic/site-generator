"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleInvalidateByRegex = void 0;
const _cloudfront_module_1 = require("@cloudfront_module");
const getDistributionId_1 = __importDefault(require("./func/getDistributionId"));
const handleInvalidateByRegex = async (event, env) => {
    const body = JSON.parse(event.body || "{}");
    const regex = body.regex;
    if (!regex || typeof regex !== "string") {
        throw new Error("Invalid request. 'regex' is a mandatory field in the body and it should be a string.");
    }
    const cloudfront = new _cloudfront_module_1.CloudFrontOperations();
    const distributionId = (0, getDistributionId_1.default)(env);
    await cloudfront.createInvalidation(distributionId, [regex]);
};
exports.handleInvalidateByRegex = handleInvalidateByRegex;
//# sourceMappingURL=index.js.map