import { APIGatewayEvent } from "aws-lambda";
import { GenerateHeaderResponse, HeaderConfig, HeaderContent, buildHeaderConfig, buildHeaderContent } from "../../../../../../page_cls_module";
import { S3Operations } from "../../../../../s3_module";
import getEnvVariable from "../../../logic/getEnvVariable";
import { PageGenerator } from "../../../generator/PageGenerator";

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

export const handleRegenerateHeader = async (event: APIGatewayEvent, env: "dev" | "prod") => {
    const bucketName = getEnvVariable("BUCKET_NAME");
    const s3 = new S3Operations(bucketName);
    const getHeaderContent = async (): Promise<HeaderContent> => {
        const data: any = await s3.getJson("header-content");
        const objectData = data.Body.toString('utf-8');
        const jsonData = JSON.parse(objectData); 
        const headerContent = buildHeaderContent(jsonData)
        return headerContent
    }
    const getHeaderConfig = async (): Promise<HeaderConfig> => {
        const data: any = await s3.getJson("header-config");
        const objectData = data.Body.toString('utf-8');
        const jsonData = JSON.parse(objectData); 
        const headerConfig = buildHeaderConfig(jsonData)
        return headerConfig
    }

    const [content, config] = await Promise.all([
        getHeaderContent(),
        getHeaderConfig(),
    ])

    const generator = new PageGenerator(env);
    const {data: header} = await generator.generateHeader(content, config);

    await s3.putFile("header", header.html);
}

export const handleGetHeaderHTML = async () => {
    const bucketName = getEnvVariable("BUCKET_NAME");
    const s3 = new S3Operations(bucketName);
    const html = await s3.getFile("header");
    console.log(`html`, html)
    return html
}