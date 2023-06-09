import { APIGatewayEvent } from "aws-lambda";
import { FooterConfig, FooterContent, buildFooterConfig, buildFooterContent } from "@page_cls_module";
import { S3Operations } from "@s3_module";
import getEnvVariable from "@/logic/getEnvVariable";

export const handleFooterConfigGet = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<FooterConfig> => {
    const bucketName = getEnvVariable("BUCKET_NAME");
    const s3 = new S3Operations(bucketName);
    const item = await s3.getJson("footer-config");

    if (!item) {
        throw new Error("No configuration found for footer-config.");
    }

    return buildFooterConfig(item);
}

export const handleFooterConfigPut = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<void> => {
    const body = JSON.parse(event.body || "{}");
    const item: FooterConfig = buildFooterConfig(body);

    const bucketName = getEnvVariable("BUCKET_NAME");
    const s3 = new S3Operations(bucketName);
    await s3.putJson("footer-config", item);
}

export const handleFooterContentGet = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<FooterContent> => {
    const bucketName = getEnvVariable("BUCKET_NAME");
    const s3 = new S3Operations(bucketName);
    const item = await s3.getJson("footer-content");

    if (!item) {
        throw new Error("No content found for footer-content.");
    }

    return buildFooterContent(item);
}

export const handleFooterContentPut = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<void> => {
    const body = JSON.parse(event.body || "{}");
    const item: FooterContent = buildFooterContent(body);

    const bucketName = getEnvVariable("BUCKET_NAME");
    const s3 = new S3Operations(bucketName);
    await s3.putJson("footer-content", item);
}