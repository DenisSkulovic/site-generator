import { APIGatewayEvent } from "aws-lambda";
import { SiteConfig, buildSiteConfig } from "@admin_cls_module";
import { S3Operations } from "@s3_module";
import getEnvVariable from "@/logic/getEnvVariable";

const handleSiteConfigGet = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<SiteConfig> => {
    const bucketName: string | undefined = getEnvVariable("BUCKET_NAME");
    const s3 = new S3Operations(bucketName);
    const item = await s3.getJson("site-config");
    return buildSiteConfig(item);
};

export default handleSiteConfigGet;
