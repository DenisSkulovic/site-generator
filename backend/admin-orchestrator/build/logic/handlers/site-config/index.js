"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDesignSystemPut = exports.handleDesignSystemGet = exports.handleSiteConfigPut = exports.handleSiteConfigGet = void 0;
const _admin_cls_module_1 = require("@admin_cls_module");
const _s3_module_1 = require("@s3_module");
const getEnvVariable_1 = __importDefault(require("@/logic/getEnvVariable"));
const handleSiteConfigGet = async (event, env) => {
    const bucketName = (0, getEnvVariable_1.default)("BUCKET_NAME");
    const s3 = new _s3_module_1.S3Operations(bucketName);
    const siteConfigKey = (0, getEnvVariable_1.default)("SITE_CONFIG_KEY");
    const item = await s3.getJson(siteConfigKey);
    return (0, _admin_cls_module_1.buildSiteConfig)(item);
};
exports.handleSiteConfigGet = handleSiteConfigGet;
const handleSiteConfigPut = async (event, env) => {
    const body = JSON.parse(event.body || "{}");
    const item = (0, _admin_cls_module_1.buildSiteConfig)(body);
    const bucketName = (0, getEnvVariable_1.default)("BUCKET_NAME");
    const s3 = new _s3_module_1.S3Operations(bucketName);
    const siteConfigKey = (0, getEnvVariable_1.default)("SITE_CONFIG_KEY");
    await s3.putJson(siteConfigKey, item);
};
exports.handleSiteConfigPut = handleSiteConfigPut;
const handleDesignSystemGet = async (event, env) => {
    const bucketName = (0, getEnvVariable_1.default)("BUCKET_NAME");
    const s3 = new _s3_module_1.S3Operations(bucketName);
    const designSystemKey = (0, getEnvVariable_1.default)("DESIGN_SYSTEM_KEY");
    const data = await s3.getCSS(designSystemKey);
    if (!data)
        throw new Error("data cannot be undefined. Probably failed to retrieve the file");
    if (!data.Body)
        throw new Error("data.Body cannot be undefined. Probably failed to retrieve the file");
    return data.Body.toString();
};
exports.handleDesignSystemGet = handleDesignSystemGet;
const handleDesignSystemPut = async (event, env) => {
    const body = JSON.parse(event.body || "{}");
    const cssContent = body.css || "";
    const bucketName = (0, getEnvVariable_1.default)("BUCKET_NAME");
    const s3 = new _s3_module_1.S3Operations(bucketName);
    const designSystemKey = (0, getEnvVariable_1.default)("DESIGN_SYSTEM_KEY");
    await s3.uploadCSS(cssContent, designSystemKey);
};
exports.handleDesignSystemPut = handleDesignSystemPut;
//# sourceMappingURL=index.js.map