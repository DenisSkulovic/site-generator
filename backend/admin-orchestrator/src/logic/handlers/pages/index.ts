import { APIGatewayEvent } from "aws-lambda";
import { S3Operations } from "@s3_module";
import { PageHTMLObject, buildPageHTMLObject } from "@page_cls_module";
import getEnvVariable from "@/logic/getEnvVariable";

export const handlePageDelete = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<void> => {
    const url: string | undefined = event.queryStringParameters?.url;
    if (!url) throw new Error("url is a mandatory query string param");
    const bucketName: string = getEnvVariable("BUCKET_NAME");
    const s3 = new S3Operations(bucketName);
    await s3.deletePage(url);
};

export const handlePagePost = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<void> => {
    const body = JSON.parse(event.body || "{}");
    const url: string | undefined = event.queryStringParameters?.url;
    if (!url) throw new Error("url is a mandatory query string param");
    const pageHTMLObject: PageHTMLObject = buildPageHTMLObject(body);
    const bucketName: string = getEnvVariable("BUCKET_NAME");
    const s3 = new S3Operations(bucketName);
    await s3.uploadPage(pageHTMLObject.html, url);
};

export const handlePagePut = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<void> => {
    const body = JSON.parse(event.body || "{}");
    const url: string | undefined = event.queryStringParameters?.url;
    if (!url) throw new Error("url is a mandatory query string param");
    const pageHTMLObject: PageHTMLObject = buildPageHTMLObject(body);
    const bucketName: string = getEnvVariable("BUCKET_NAME");
    const s3 = new S3Operations(bucketName);
    await s3.uploadPage(pageHTMLObject.html, url);
};