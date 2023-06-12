"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const DTO = __importStar(require("@page_cls_module"));
const AWS = __importStar(require("aws-sdk"));
const s3 = new AWS.S3();
const fetchHeaderFromS3 = async () => {
    if (!process.env.BUCKET_NAME)
        throw new Error("BUCKET_NAME is a mandatory env param");
    if (!process.env.HEADER_KEY_S3)
        throw new Error("HEADER_KEY_S3 is a mandatory env param");
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: process.env.HEADER_KEY_S3
    };
    try {
        const data = await s3.getObject(params).promise();
        const headerObject = JSON.parse(data.Body);
        return DTO.buildHeaderHTMLObject(headerObject);
    }
    catch (error) {
        console.log(error);
        return undefined;
    }
};
exports.default = fetchHeaderFromS3;
//# sourceMappingURL=fetchHeaderFromS3.js.map