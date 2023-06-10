import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { S3Operations } from "@s3_module";

export const handleAssetUpload = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<void> => {
    const assetData = JSON.parse(event.body || "{}");
    const assetPath: string | undefined = event.queryStringParameters?.path;
    if (!assetPath) throw new Error("path is a mandatory query string param");
    const bucketName: string | undefined = process.env.BUCKET_NAME;
    if (!bucketName) throw new Error("BUCKET_NAME is a mandatory env param");
    const s3 = new S3Operations(bucketName);
    await s3.uploadAsset(assetPath, assetData);
};

export const handleAssetDownload = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<APIGatewayProxyResult> => {
    const assetPath: string | undefined = event.queryStringParameters?.path;
    if (!assetPath) throw new Error("path is a mandatory query string param");
    const bucketName: string | undefined = process.env.BUCKET_NAME;
    if (!bucketName) throw new Error("BUCKET_NAME is a mandatory env param");
    const s3 = new S3Operations(bucketName);
    const assetData = await s3.downloadAsset(assetPath);

    return {
        statusCode: 200,
        body: JSON.stringify(assetData),
        headers: {
            'Content-Type': 'application/octet-stream',
            'Content-Disposition': `attachment; filename=${assetPath}`,
        },
        isBase64Encoded: true
    };
};
