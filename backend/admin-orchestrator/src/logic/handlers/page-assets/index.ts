import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { S3Operations } from "../../../../../s3_module";
import getEnvVariable from "../../../logic/getEnvVariable";
import * as Busboy from 'busboy';
import { Readable } from 'stream';

type File = {
    content: Buffer;
    contentType: string;
};

export const handleAssetUpload = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    let body = event.body
    console.log(`body`, body)
    if (!body) throw new Error("body is mandatory")

    let isBase64Encoded = event.isBase64Encoded;
    if (!isBase64Encoded) {
        body = Buffer.from(body).toString('base64');
    }

    let bodyBuffer = Buffer.from(body, 'base64');

    const contentType = event.headers['content-type'] || event.headers['Content-Type'];
    console.log('Content Type:', contentType);

    const busboy = Busboy.default({ headers: { 'content-type': contentType } });

    let file: File | undefined;
    let pagePath: string | undefined;
    let filePromise: Promise<File> | undefined;

    busboy.on('file', (fieldname: string, fileStream: NodeJS.ReadableStream, filename: string, encoding: string, mimetype: string) => {
        console.log('File [' + fieldname + ']: filename: ' + filename);
        if (fieldname === 'file') {
            filePromise = new Promise<File>((resolve, reject) => {
                const chunks: Buffer[] = [];

                fileStream.on('data', (chunk) => {
                    chunks.push(chunk);
                    console.log('Received data chunk', chunk);
                });

                fileStream.on('end', () => {
                    resolve({
                        content: Buffer.concat(chunks),
                        contentType: mimetype,
                    });
                });

                fileStream.on('error', (err) => {
                    console.log('File stream error: ', err);
                });
            });
        }
    });

    busboy.on('field', (fieldname: string, val: string, fieldnameTruncated: boolean, valTruncated: boolean, encoding: string, mimetype: string) => {
        if (fieldname === 'pagePath') {
            pagePath = val;
        }
    });

    busboy.on('part', (part) => {
        console.log('Part:', part);
    });

    // Create a readable stream from the body buffer and pipe it to Busboy for parsing
    const readableStream = new Readable();
    readableStream.push(bodyBuffer);
    readableStream.push(null);
    readableStream.pipe(busboy);

    // Wait for busboy to finish parsing
    await new Promise((resolve, reject) => {
        busboy.on('finish', (e: any) => {
            console.log('Busboy finished parsing');
            resolve(e)
        });
        busboy.on('error', reject);
    });

    file = await filePromise;

    if (!file) throw new Error("File is required");
    if (!pagePath) throw new Error("PagePath is required");

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
