import { APIGatewayEvent } from "aws-lambda";
import { SiteConfig, buildSiteConfig } from "@admin_cls_module";
import { S3Operations } from "@s3_module";
import getEnvVariable from "@/logic/getEnvVariable";

export const handleSiteConfigGet = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<SiteConfig> => {
    const bucketName: string | undefined = getEnvVariable("BUCKET_NAME");
    const s3 = new S3Operations(bucketName);
    const item = await s3.getJson("site-config");
    return buildSiteConfig(item);
};

export const handleSiteConfigPut = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<void> => {
    const body = JSON.parse(event.body || "{}");
    const item: SiteConfig = buildSiteConfig(body);
    const bucketName: string | undefined = getEnvVariable("BUCKET_NAME");
    const s3 = new S3Operations(bucketName);
    await s3.putJson("site-config", item);
};

export const handleDesignSystemGet = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<string> => {
    const bucketName: string | undefined = getEnvVariable("BUCKET_NAME");
    const s3 = new S3Operations(bucketName);
    const data = await s3.getCSS("design-system");
    return data.Body.toString();
};

export const handleDesignSystemPut = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<void> => {
    const body = JSON.parse(event.body || "{}");
    const cssContent: string = body.css || "";
    const bucketName: string | undefined = getEnvVariable("BUCKET_NAME");
    const s3 = new S3Operations(bucketName);
    await s3.uploadCSS(cssContent, "design-system");
};