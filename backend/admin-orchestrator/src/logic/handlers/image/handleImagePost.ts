import { APIGatewayEvent } from "aws-lambda";
import { S3Operations } from "@s3_module";
import getEnvVariable from "@/logic/getEnvVariable";

interface ImageRequestBody {
    key: string;
    imageData: Buffer;
    contentType: string;
}

const handleImagePost = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<void> => {
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

export default handleImagePost;
