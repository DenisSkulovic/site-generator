import { APIGatewayEvent } from "aws-lambda";
import { S3Operations } from "@s3_module";
import getEnvVariable from "@/logic/getEnvVariable";

const handleImageDelete = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<void> => {
    const key: string = event.pathParameters?.key;
    if (!key) {
        throw new Error("key is a mandatory path param");
    }

    const bucketName = getEnvVariable("BUCKET_NAME");
    const s3 = new S3Operations(bucketName);
    await s3.deleteImage(key);
}

export default handleImageDelete;
