"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleImagePut = exports.handleImagePost = exports.handleImageGet = exports.handleImageDelete = exports.buildImageRequestBody = exports.ImageRequestBody = void 0;
const _s3_module_1 = require("@s3_module");
const getEnvVariable_1 = __importDefault(require("@/logic/getEnvVariable"));
class ImageRequestBody {
    constructor(key, imageData, contentType) {
        this.key = key;
        this.imageData = imageData;
        this.contentType = contentType;
    }
}
exports.ImageRequestBody = ImageRequestBody;
const buildImageRequestBody = (obj) => {
    if (!obj.key) {
        throw new Error("key is mandatory in request body");
    }
    if (!obj.imageData) {
        throw new Error("imageData is mandatory in request body");
    }
    if (!obj.contentType) {
        throw new Error("contentType is mandatory in request body");
    }
    const req = new ImageRequestBody(obj.key, obj.imageData, obj.contentType);
    return req;
};
exports.buildImageRequestBody = buildImageRequestBody;
const handleImageDelete = async (event, env) => {
    const key = event.pathParameters?.key;
    if (!key) {
        throw new Error("key is a mandatory path param");
    }
    const bucketName = (0, getEnvVariable_1.default)("BUCKET_NAME");
    const s3 = new _s3_module_1.S3Operations(bucketName);
    await s3.deleteImage(key);
};
exports.handleImageDelete = handleImageDelete;
const handleImageGet = async (event, env) => {
    const key = event.pathParameters?.key;
    if (!key) {
        throw new Error("key is a mandatory path param");
    }
    const bucketName = (0, getEnvVariable_1.default)("BUCKET_NAME");
    const s3 = new _s3_module_1.S3Operations(bucketName);
    const image = await s3.getImage(key);
    return image;
};
exports.handleImageGet = handleImageGet;
const handleImagePost = async (event, env) => {
    const body = JSON.parse(event.body || "{}");
    const req = (0, exports.buildImageRequestBody)(body);
    const bucketName = (0, getEnvVariable_1.default)("BUCKET_NAME");
    const s3 = new _s3_module_1.S3Operations(bucketName);
    await s3.uploadImage(req.imageData, req.key, req.contentType);
};
exports.handleImagePost = handleImagePost;
const handleImagePut = async (event, env) => {
    const body = JSON.parse(event.body || "{}");
    const req = (0, exports.buildImageRequestBody)(body);
    const bucketName = (0, getEnvVariable_1.default)("BUCKET_NAME");
    const s3 = new _s3_module_1.S3Operations(bucketName);
    await s3.uploadImage(req.imageData, req.key, req.contentType);
};
exports.handleImagePut = handleImagePut;
//# sourceMappingURL=index.js.map