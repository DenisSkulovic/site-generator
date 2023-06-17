import { S3Operations } from "@s3_module"
import getEnvVariable from "@/logic/getEnvVariable"

const fetchHeaderFromS3 = async (): Promise<string | undefined> => {
    const bucketName = getEnvVariable("BUCKET_NAME")
    const s3 = new S3Operations(bucketName);
    try {
        const html = await s3.getFile("header");
        return html.Body.toString("utf-8")
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

export default fetchHeaderFromS3;