import { APIGatewayEvent } from "aws-lambda";
import { HeaderContent, buildHeaderContent } from "@page_cls_module";
import { S3Operations } from "@s3_module";
import getEnvVariable from "@/logic/getEnvVariable";

const handleHeaderContentGet = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<HeaderContent> => {
    const bucketName = getEnvVariable("BUCKET_NAME");
    const s3 = new S3Operations(bucketName);
    const item = await s3.getJson("header-content");

    if (!item) {
        throw new Error("No content found for header-content.");
    }

    return buildHeaderContent(item);
}

export default handleHeaderContentGet;
