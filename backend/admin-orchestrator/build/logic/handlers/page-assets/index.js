"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAssetUpload = void 0;
const _s3_module_1 = require("@s3_module");
const aws_lambda_multipart_parser_1 = require("aws-lambda-multipart-parser"); // import the parser
const getEnvVariable_1 = __importDefault(require("@/logic/getEnvVariable"));
const handleAssetUpload = async (event) => {
    const parsedBody = (0, aws_lambda_multipart_parser_1.parse)(event, true); // parse the event body
    const file = parsedBody.files.file; // access the uploaded file
    const pagePath = parsedBody.fields.pagePath; // access the page path
    if (!file || !pagePath)
        throw new Error("File and pagePath are required");
    const bucketName = (0, getEnvVariable_1.default)("BUCKET_NAME");
    const s3 = new _s3_module_1.S3Operations(bucketName);
    await s3.uploadAsset(file.content, pagePath, file.contentType);
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "File uploaded successfully"
        })
    };
};
exports.handleAssetUpload = handleAssetUpload;
//# sourceMappingURL=index.js.map