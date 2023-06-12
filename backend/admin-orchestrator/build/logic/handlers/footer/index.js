"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleFooterContentPut = exports.handleFooterContentGet = exports.handleFooterConfigPut = exports.handleFooterConfigGet = void 0;
const _page_cls_module_1 = require("@page_cls_module");
const _s3_module_1 = require("@s3_module");
const getEnvVariable_1 = __importDefault(require("@/logic/getEnvVariable"));
const handleFooterConfigGet = async (event, env) => {
    const bucketName = (0, getEnvVariable_1.default)("BUCKET_NAME");
    const s3 = new _s3_module_1.S3Operations(bucketName);
    const item = await s3.getJson("footer-config");
    if (!item) {
        throw new Error("No configuration found for footer-config.");
    }
    return (0, _page_cls_module_1.buildFooterConfig)(item);
};
exports.handleFooterConfigGet = handleFooterConfigGet;
const handleFooterConfigPut = async (event, env) => {
    const body = JSON.parse(event.body || "{}");
    const item = (0, _page_cls_module_1.buildFooterConfig)(body);
    const bucketName = (0, getEnvVariable_1.default)("BUCKET_NAME");
    const s3 = new _s3_module_1.S3Operations(bucketName);
    await s3.putJson("footer-config", item);
};
exports.handleFooterConfigPut = handleFooterConfigPut;
const handleFooterContentGet = async (event, env) => {
    const bucketName = (0, getEnvVariable_1.default)("BUCKET_NAME");
    const s3 = new _s3_module_1.S3Operations(bucketName);
    const item = await s3.getJson("footer-content");
    if (!item) {
        throw new Error("No content found for footer-content.");
    }
    return (0, _page_cls_module_1.buildFooterContent)(item);
};
exports.handleFooterContentGet = handleFooterContentGet;
const handleFooterContentPut = async (event, env) => {
    const body = JSON.parse(event.body || "{}");
    const item = (0, _page_cls_module_1.buildFooterContent)(body);
    const bucketName = (0, getEnvVariable_1.default)("BUCKET_NAME");
    const s3 = new _s3_module_1.S3Operations(bucketName);
    await s3.putJson("footer-content", item);
};
exports.handleFooterContentPut = handleFooterContentPut;
//# sourceMappingURL=index.js.map