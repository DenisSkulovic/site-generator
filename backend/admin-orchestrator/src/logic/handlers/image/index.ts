import { APIGatewayEvent } from "aws-lambda";
import { S3Operations } from "@s3_module";
import getEnvVariable from "@/logic/getEnvVariable";

interface ImageRequestBody {
    key: string;
    imageData: Buffer;
    contentType: string;
}

export const handleImageDelete = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<void> => {
    const key: string = event.pathParameters?.key;
    if (!key) {
        throw new Error("key is a mandatory path param");
    }

    const bucketName = getEnvVariable("BUCKET_NAME");
    const s3 = new S3Operations(bucketName);
    await s3.deleteImage(key);
}

export const handleImageGet = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<GetObjectOutput> => {
    const key: string = event.pathParameters?.key;
    if (!key) {
        throw new Error("key is a mandatory path param");
    }

    const bucketName = getEnvVariable("BUCKET_NAME");
    const s3 = new S3Operations(bucketName);
    const image = await s3.getImage(key);
    return image;
}

export const handleImagePost = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<void> => {
    const body: ImageRequestBody = JSON.parse(event.body || "{}");

    const { key, imageData, contentType } = body;
    if (!key) {
        throw new Error("key is a mandatory path param");
    }
    if (!imageData) {
        throw new Error("imageData is a mandatory path param");
    }
    if (!contentType) {
        throw new Error("contentType is a mandatory path param");
    }

    const bucketName = getEnvVariable("BUCKET_NAME");
    const s3 = new S3Operations(bucketName);
    await s3.uploadImage(imageData, key, contentType);
}

export const handleImagePut = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<void> => {
    const body: ImageRequestBody = JSON.parse(event.body || "{}");

    const { key, imageData, contentType } = body;
    if (!key) {
        throw new Error("key is a mandatory path param");
    }
    if (!imageData) {
        throw new Error("imageData is a mandatory path param");
    }
    if (!contentType) {
        throw new Error("contentType is a mandatory path param");
    }

    const bucketName = getEnvVariable("BUCKET_NAME");
    const s3 = new S3Operations(bucketName);
    await s3.uploadImage(imageData, key, contentType);
}