import { APIGatewayEvent } from "aws-lambda";
import { FooterConfig, FooterContent, buildFooterConfig, buildFooterContent } from "../../../../../../page_cls_module";
import { S3Operations } from "../../../../../s3_module";
import getEnvVariable from "../../../logic/getEnvVariable";
import { PageGenerator } from "../../../generator/PageGenerator";

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

export const handleRegenerateFooter = async (event: APIGatewayEvent, env: "dev" | "prod") => {
    const bucketName = getEnvVariable("BUCKET_NAME");
    const s3 = new S3Operations(bucketName);
    const getFooterContent = async (): Promise<FooterContent> => {
        const data: any = await s3.getJson("footer-content");
        const objectData = data.Body.toString('utf-8');
        const jsonData = JSON.parse(objectData); 
        const footerContent = buildFooterContent(jsonData)
        return footerContent
    }
    const getFooterConfig = async (): Promise<FooterConfig> => {
        const data: any = await s3.getJson("footer-config");
        const objectData = data.Body.toString('utf-8');
        const jsonData = JSON.parse(objectData); 
        const footerConfig = buildFooterConfig(jsonData)
        return footerConfig
    }

    const [content, config] = await Promise.all([
        getFooterContent(),
        getFooterConfig(),
    ])

    const generator = new PageGenerator(env);
    const {data: footer} = await generator.generateFooter(content, config);

    await s3.putFile("footer", footer.html);
}

export const handleGetFooterHTML = async () => {
    const bucketName = getEnvVariable("BUCKET_NAME");
    const s3 = new S3Operations(bucketName);
    const html = await s3.getFile("footer");
    console.log(`html`, html)
    return html
}