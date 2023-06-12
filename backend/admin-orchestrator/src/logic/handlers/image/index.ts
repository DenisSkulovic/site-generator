import { APIGatewayEvent } from "aws-lambda";
import { S3Operations } from "@s3_module";
import getEnvVariable from "@/logic/getEnvVariable";
import { GetObjectOutput } from "aws-sdk/clients/s3";

export class ImageRequestBody {
    key: string
    imageData: Buffer
    contentType: string
    constructor(
        key: string,
        imageData: Buffer,
        contentType: string,
    ) {
        this.key = key
        this.imageData = imageData
        this.contentType = contentType
    }
}

export const buildImageRequestBody = (obj: any) => {
    if (!obj.key) {
        throw new Error("key is mandatory in request body");
    }
    if (!obj.imageData) {
        throw new Error("imageData is mandatory in request body");
    }
    if (!obj.contentType) {
        throw new Error("contentType is mandatory in request body");
    }
    const req: ImageRequestBody = new ImageRequestBody(
        obj.key,
        obj.imageData,
        obj.contentType,
    )
    return req
}

export const handleImageDelete = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<void> => {
    const key: string | undefined = event.pathParameters?.key;
    if (!key) {
        throw new Error("key is a mandatory path param");
    }

    const bucketName = getEnvVariable("BUCKET_NAME");
    const s3 = new S3Operations(bucketName);
    await s3.deleteImage(key);
}

export const handleImageGet = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<GetObjectOutput | undefined> => {
    const key: string | undefined = event.pathParameters?.key;
    if (!key) {
        throw new Error("key is a mandatory path param");
    }

    const bucketName = getEnvVariable("BUCKET_NAME");
    const s3 = new S3Operations(bucketName);
    const image: GetObjectOutput | undefined = await s3.getImage(key);
    return image;
}

export const handleImagePost = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<void> => {
    const body: { [key: string]: any } = JSON.parse(event.body || "{}");
    const req: ImageRequestBody = buildImageRequestBody(body)
    const bucketName = getEnvVariable("BUCKET_NAME");
    const s3 = new S3Operations(bucketName);
    await s3.uploadImage(req.imageData, req.key, req.contentType);
}

export const handleImagePut = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<void> => {
    const body: { [key: string]: any } = JSON.parse(event.body || "{}");
    const req: ImageRequestBody = buildImageRequestBody(body)
    const bucketName = getEnvVariable("BUCKET_NAME");
    const s3 = new S3Operations(bucketName);
    await s3.uploadImage(req.imageData, req.key, req.contentType);
}