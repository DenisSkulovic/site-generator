"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePagePut = exports.handlePagePost = exports.handlePageDelete = void 0;
const _s3_module_1 = require("@s3_module");
const _page_cls_module_1 = require("@page_cls_module");
const getEnvVariable_1 = __importDefault(require("@/logic/getEnvVariable"));
const handlePageDelete = async (event, env) => {
    const url = event.queryStringParameters?.url;
    if (!url)
        throw new Error("url is a mandatory query string param");
    const bucketName = (0, getEnvVariable_1.default)("BUCKET_NAME");
    const s3 = new _s3_module_1.S3Operations(bucketName);
    await s3.deletePage(url);
};
exports.handlePageDelete = handlePageDelete;
const handlePagePost = async (event, env) => {
    const body = JSON.parse(event.body || "{}");
    const url = event.queryStringParameters?.url;
    if (!url)
        throw new Error("url is a mandatory query string param");
    const pageHTMLObject = (0, _page_cls_module_1.buildPageHTMLObject)(body);
    const bucketName = (0, getEnvVariable_1.default)("BUCKET_NAME");
    const s3 = new _s3_module_1.S3Operations(bucketName);
    await s3.uploadPage(pageHTMLObject.html, url);
};
exports.handlePagePost = handlePagePost;
const handlePagePut = async (event, env) => {
    const body = JSON.parse(event.body || "{}");
    const url = event.queryStringParameters?.url;
    if (!url)
        throw new Error("url is a mandatory query string param");
    const pageHTMLObject = (0, _page_cls_module_1.buildPageHTMLObject)(body);
    const bucketName = (0, getEnvVariable_1.default)("BUCKET_NAME");
    const s3 = new _s3_module_1.S3Operations(bucketName);
    await s3.uploadPage(pageHTMLObject.html, url);
};
exports.handlePagePut = handlePagePut;
//# sourceMappingURL=index.js.map