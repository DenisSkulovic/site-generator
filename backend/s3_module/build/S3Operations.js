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
exports.S3Operations = void 0;
const AWS = __importStar(require("aws-sdk"));
class S3Operations {
    constructor(bucketName) {
        const region = process.env.REGION;
        if (!region)
            throw new Error("REGION is a mandatory env param");
        AWS.config.update({ region }); // set your region
        this.s3 = new AWS.S3();
        this.bucketName = bucketName;
    }
    async uploadPage(html, key, contentType = "text/html") {
        const fileData = Buffer.from(html, 'utf8');
        const params = {
            Bucket: this.bucketName,
            Key: key,
            Body: fileData,
            ContentType: contentType
        };
        try {
            await this.s3.putObject(params).promise();
            console.log("Uploaded file:", key);
        }
        catch (error) {
            console.error("Unable to upload file. Error:", JSON.stringify(error));
        }
    }
    async deletePage(key) {
        const params = {
            Bucket: this.bucketName,
            Key: key
        };
        try {
            await this.s3.deleteObject(params).promise();
            console.log("Deleted file:", key);
        }
        catch (error) {
            console.error("Unable to delete file. Error:", JSON.stringify(error));
        }
    }
    async uploadImage(imageData, key, contentType = "image/png") {
        const params = {
            Bucket: this.bucketName,
            Key: key,
            Body: imageData,
            ContentType: contentType
        };
        try {
            await this.s3.putObject(params).promise();
            console.log("Uploaded image:", key);
        }
        catch (error) {
            console.error("Unable to upload image. Error:", JSON.stringify(error));
        }
    }
    async getImage(key) {
        const params = {
            Bucket: this.bucketName,
            Key: key
        };
        try {
            const data = await this.s3.getObject(params).promise();
            console.log("Retrieved image:", key);
            return data;
        }
        catch (error) {
            console.error("Unable to retrieve image. Error:", JSON.stringify(error));
        }
    }
    async deleteImage(key) {
        const params = {
            Bucket: this.bucketName,
            Key: key
        };
        try {
            await this.s3.deleteObject(params).promise();
            console.log("Deleted image:", key);
        }
        catch (error) {
            console.error("Unable to delete image. Error:", JSON.stringify(error));
        }
    }
    async putJson(fileName, data) {
        const params = {
            Bucket: this.bucketName,
            Key: `${fileName}.json`,
            Body: JSON.stringify(data),
            ContentType: "application/json"
        };
        try {
            await this.s3.putObject(params).promise();
            console.log(`Uploaded JSON file "${fileName}.json"`);
        }
        catch (error) {
            throw new Error("Unable to upload JSON file. Error: " + JSON.stringify(error));
        }
    }
    async getJson(fileName) {
        const params = {
            Bucket: this.bucketName,
            Key: `${fileName}.json`
        };
        try {
            const data = await this.s3.getObject(params).promise();
            console.log(`Retrieved JSON file "${fileName}.json": ` + JSON.stringify(data));
            return data;
        }
        catch (error) {
            throw new Error("Unable to get JSON file. Error: " + JSON.stringify(error));
        }
    }
    async uploadCSS(css, key, contentType = "text/css") {
        const fileData = Buffer.from(css, 'utf8');
        const params = {
            Bucket: this.bucketName,
            Key: key,
            Body: fileData,
            ContentType: contentType
        };
        try {
            await this.s3.putObject(params).promise();
            console.log("Uploaded CSS file:", key);
        }
        catch (error) {
            console.error("Unable to upload CSS file. Error:", JSON.stringify(error));
        }
    }
    async getCSS(key) {
        const params = {
            Bucket: this.bucketName,
            Key: key
        };
        try {
            const data = await this.s3.getObject(params).promise();
            console.log("Retrieved CSS file:", key);
            return data;
        }
        catch (error) {
            console.error("Unable to retrieve CSS file. Error:", JSON.stringify(error));
        }
    }
    async uploadAsset(assetData, key, contentType) {
        const params = {
            Bucket: this.bucketName,
            Key: key,
            Body: assetData,
            ContentType: contentType
        };
        try {
            await this.s3.putObject(params).promise();
            console.log("Uploaded asset:", key);
        }
        catch (error) {
            console.error("Unable to upload asset. Error:", JSON.stringify(error));
        }
    }
    async downloadAsset(key) {
        const params = {
            Bucket: this.bucketName,
            Key: key
        };
        try {
            const data = await this.s3.getObject(params).promise();
            console.log("Retrieved asset:", key);
            return data;
        }
        catch (error) {
            console.error("Unable to retrieve asset. Error:", JSON.stringify(error));
        }
    }
}
exports.S3Operations = S3Operations;
//# sourceMappingURL=S3Operations.js.map