import { APIGatewayEvent } from "aws-lambda";
import { S3Operations } from "@s3_module";
import { PageHTMLObject, buildPageHTMLObject } from "@page_cls_module";

const handlePagePost = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<void> => {
    const body = JSON.parse(event.body || "{}");
    const url: string = event.queryStringParameters?.url;
    if (!url) throw new Error("url is a mandatory query string param");
    const pageHTMLObject: PageHTMLObject = buildPageHTMLObject(body);
    const bucketName: string | undefined = process.env.BUCKET_NAME;
    if (!bucketName) throw new Error("BUCKET_NAME is a mandatory env param");
    const s3 = new S3Operations(bucketName);
    await s3.uploadPage(url, pageHTMLObject);
};

export default handlePagePost;
