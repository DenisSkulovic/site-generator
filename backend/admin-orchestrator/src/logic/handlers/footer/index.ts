import { APIGatewayEvent } from "aws-lambda";
import { FooterConfig, FooterContent, buildFooterConfig, buildFooterContent } from "../../../../../../page_cls_module";
import { S3Operations } from "../../../../../s3_module";
import getEnvVariable from "../../../logic/getEnvVariable";

export const handleFooterConfigGet = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<FooterConfig> => {
    const bucketName = getEnvVariable("BUCKET_NAME");
    const s3 = new S3Operations(bucketName);
    const data: any = await s3.getJson("footer-config");
    const objectData = data.Body.toString('utf-8');
    const jsonData = JSON.parse(objectData); 
    return buildFooterConfig(jsonData);
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
    const data: any = await s3.getJson("footer-content");
    const objectData = data.Body.toString('utf-8');
    const jsonData = JSON.parse(objectData); 
    return buildFooterContent(jsonData);
}

export const handleFooterContentPut = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<void> => {
    const body = JSON.parse(event.body || "{}");
    const item: FooterContent = buildFooterContent(body);

    const bucketName = getEnvVariable("BUCKET_NAME");
    const s3 = new S3Operations(bucketName);
    await s3.putJson("footer-content", item);
}