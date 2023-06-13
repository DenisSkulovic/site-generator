import { APIGatewayEvent } from "aws-lambda";
import { HeaderConfig, HeaderContent, buildHeaderConfig, buildHeaderContent } from "../../../../../../page_cls_module";
import { S3Operations } from "../../../../../s3_module";
import getEnvVariable from "../../../logic/getEnvVariable";

export const handleHeaderConfigGet = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<HeaderConfig> => {
    const bucketName = getEnvVariable("BUCKET_NAME");
    const s3 = new S3Operations(bucketName);
    const data: any = await s3.getJson("header-config");
    const objectData = data.Body.toString('utf-8');
    const jsonData = JSON.parse(objectData); 
    return buildHeaderConfig(jsonData)
}

export const handleHeaderConfigPut = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<void> => {
    const body = JSON.parse(event.body || "{}");
    const item: HeaderConfig = buildHeaderConfig(body);

    const bucketName = getEnvVariable("BUCKET_NAME");
    const s3 = new S3Operations(bucketName);
    await s3.putJson("header-config", item);
}

export const handleHeaderContentGet = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<HeaderContent> => {
    const bucketName = getEnvVariable("BUCKET_NAME");
    const s3 = new S3Operations(bucketName);
    const data: any = await s3.getJson("header-content");
    const objectData = data.Body.toString('utf-8');
    const jsonData = JSON.parse(objectData); 
    return buildHeaderContent(jsonData)
}

export const handleHeaderContentPut = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<void> => {
    const body = JSON.parse(event.body || "{}");
    const item: HeaderContent = buildHeaderContent(body);

    const bucketName = getEnvVariable("BUCKET_NAME");
    const s3 = new S3Operations(bucketName);
    await s3.putJson("header-content", item);
}