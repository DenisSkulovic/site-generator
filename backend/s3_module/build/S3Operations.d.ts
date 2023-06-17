/// <reference types="node" />
import * as AWS from "aws-sdk";
export declare class S3Operations {
    private s3;
    private bucketName;
    constructor(bucketName: string);
    uploadPage(html: string, key: string, contentType?: string): Promise<void>;
    deletePage(key: string): Promise<void>;
    uploadImage(imageData: Buffer, key: string, contentType?: string): Promise<void>;
    getImage(key: string): Promise<AWS.S3.GetObjectOutput | undefined>;
    deleteImage(key: string): Promise<void>;
    putJson(fileName: string, data: any): Promise<void>;
    getFile(fileName: string): Promise<any>;
    putFile(fileName: string, data: any): Promise<void>;
    getJson(fileName: string): Promise<any>;
    uploadCSS(css: string, key: string, contentType?: string): Promise<void>;
    getCSS(key: string): Promise<AWS.S3.GetObjectOutput | undefined>;
    uploadAsset(assetData: Buffer, key: string, contentType: string): Promise<void>;
    downloadAsset(key: string): Promise<AWS.S3.GetObjectOutput | undefined>;
}
//# sourceMappingURL=S3Operations.d.ts.map