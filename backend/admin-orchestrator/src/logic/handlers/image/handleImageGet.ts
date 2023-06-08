import { APIGatewayEvent } from "aws-lambda";
import { S3Operations } from "@s3_module";
import getEnvVariable from "@/logic/getEnvVariable";
import { GetObjectOutput } from "aws-sdk/clients/s3";

const handleImageGet = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<GetObjectOutput> => {
    const key: string = event.pathParameters?.key;
    if (!key) {
        throw new Error("key is a mandatory path param");
    }

    const bucketName = getEnvVariable("BUCKET_NAME");
    const s3 = new S3Operations(bucketName);
    const image = await s3.getImage(key);
    return image;
}

export default handleImageGet;
