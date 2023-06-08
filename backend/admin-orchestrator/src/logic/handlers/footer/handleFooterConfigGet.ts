import { APIGatewayEvent } from "aws-lambda";
import { FooterConfig, buildFooterConfig } from "@page_cls_module";
import { S3Operations } from "@s3_module";
import getEnvVariable from "@/logic/getEnvVariable";

const handleFooterConfigGet = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<FooterConfig> => {
    const bucketName = getEnvVariable("BUCKET_NAME");
    const s3 = new S3Operations(bucketName);
    const item = await s3.getJson("footer-config");

    if (!item) {
        throw new Error("No configuration found for footer-config.");
    }

    return buildFooterConfig(item);
}

export default handleFooterConfigGet;
