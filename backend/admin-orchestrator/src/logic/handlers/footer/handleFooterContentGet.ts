import { APIGatewayEvent } from "aws-lambda";
import { FooterContent, buildFooterContent } from "@page_cls_module";
import { S3Operations } from "@s3_module";
import getEnvVariable from "@/logic/getEnvVariable";

const handleFooterContentGet = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<FooterContent> => {
    const bucketName = getEnvVariable("BUCKET_NAME");
    const s3 = new S3Operations(bucketName);
    const item = await s3.getJson("footer-content");

    if (!item) {
        throw new Error("No content found for footer-content.");
    }

    return buildFooterContent(item);
}

export default handleFooterContentGet;
