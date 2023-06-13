import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { S3Operations } from "../../../../../s3_module";
import * as Busboy from 'busboy';
import getEnvVariable from "../../../logic/getEnvVariable";

type File = {
    content: Buffer;
    contentType: string;
};

export const handleAssetUpload = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    const busboy = Busboy.default({
        headers: {
            'content-type': event.headers['content-type'] || event.headers['Content-Type'],
        },
    });

    let file: File | undefined;
    let pagePath: string | undefined;

    busboy.on('file', (fieldname: string, fileStream: NodeJS.ReadableStream, filename: string, encoding: string, mimetype: string) => {
        if (fieldname === 'file') {
            const chunks: any[] = [];
            fileStream.on('data', (chunk) => {
                chunks.push(chunk);
            });

            fileStream.on('end', () => {
                file = {
                    content: Buffer.concat(chunks),
                    contentType: mimetype,
                };
            });
        }
    });

    busboy.on('field', (fieldname: string, val: string, fieldnameTruncated: boolean, valTruncated: boolean, encoding: string, mimetype: string) => {
        if (fieldname === 'pagePath') {
            pagePath = val;
        }
    });

    await new Promise((resolve, reject) => {
        busboy.on('finish', resolve);
        busboy.on('error', reject);
        busboy.end(event.body);
    });

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
