import * as DTO from "@page_cls_module"
import * as AWS from "aws-sdk"

const s3 = new AWS.S3();

const fetchHeaderFromS3 = async (): Promise<DTO.HeaderHTMLObject | undefined> => {
    if (!process.env.BUCKET_NAME) throw new Error("BUCKET_NAME is a mandatory env param")
    if (!process.env.HEADER_KEY_S3) throw new Error("HEADER_KEY_S3 is a mandatory env param")
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: process.env.HEADER_KEY_S3
    };
    
    try {
        const data = await s3.getObject(params).promise();
        const headerObject = JSON.parse(data.Body as string);
        return DTO.buildHeaderHTMLObject(headerObject);
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

export default fetchHeaderFromS3;
