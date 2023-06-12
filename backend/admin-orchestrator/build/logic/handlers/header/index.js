"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleHeaderContentPut = exports.handleHeaderContentGet = exports.handleHeaderConfigPut = exports.handleHeaderConfigGet = void 0;
const _page_cls_module_1 = require("@page_cls_module");
const _s3_module_1 = require("@s3_module");
const getEnvVariable_1 = __importDefault(require("@/logic/getEnvVariable"));
const handleHeaderConfigGet = async (event, env) => {
    const bucketName = (0, getEnvVariable_1.default)("BUCKET_NAME");
    const s3 = new _s3_module_1.S3Operations(bucketName);
    const item = await s3.getJson("header-config");
    if (!item) {
        throw new Error("No configuration found for header-config.");
    }
    return (0, _page_cls_module_1.buildHeaderConfig)(item);
};
exports.handleHeaderConfigGet = handleHeaderConfigGet;
const handleHeaderConfigPut = async (event, env) => {
    const body = JSON.parse(event.body || "{}");
    const item = (0, _page_cls_module_1.buildHeaderConfig)(body);
    const bucketName = (0, getEnvVariable_1.default)("BUCKET_NAME");
    const s3 = new _s3_module_1.S3Operations(bucketName);
    await s3.putJson("header-config", item);
};
exports.handleHeaderConfigPut = handleHeaderConfigPut;
const handleHeaderContentGet = async (event, env) => {
    const bucketName = (0, getEnvVariable_1.default)("BUCKET_NAME");
    const s3 = new _s3_module_1.S3Operations(bucketName);
    const item = await s3.getJson("header-content");
    if (!item) {
        throw new Error("No content found for header-content.");
    }
    return (0, _page_cls_module_1.buildHeaderContent)(item);
};
exports.handleHeaderContentGet = handleHeaderContentGet;
const handleHeaderContentPut = async (event, env) => {
    const body = JSON.parse(event.body || "{}");
    const item = (0, _page_cls_module_1.buildHeaderContent)(body);
    const bucketName = (0, getEnvVariable_1.default)("BUCKET_NAME");
    const s3 = new _s3_module_1.S3Operations(bucketName);
    await s3.putJson("header-content", item);
};
exports.handleHeaderContentPut = handleHeaderContentPut;
//# sourceMappingURL=index.js.map