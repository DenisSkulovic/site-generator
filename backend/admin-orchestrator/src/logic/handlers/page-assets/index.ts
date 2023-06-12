import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { S3Operations } from "@s3_module";
import { parse } from "aws-lambda-multipart-parser"; // import the parser
import getEnvVariable from "@/logic/getEnvVariable";

export const handleAssetUpload = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    const parsedBody = parse(event, true); // parse the event body
    const file = parsedBody.files.file; // access the uploaded file
    const pagePath = parsedBody.fields.pagePath; // access the page path

    if (!file || !pagePath) throw new Error("File and pagePath are required");

    const bucketName: string = getEnvVariable("BUCKET_NAME");

    const s3 = new S3Operations(bucketName);
    await s3.uploadAsset(file.content, pagePath, file.contentType);

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "File uploaded successfully"
        })
    };
};