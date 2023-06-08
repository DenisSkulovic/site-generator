import { APIGatewayEvent } from "aws-lambda";
import { SiteConfig, buildSiteConfig } from "@admin_cls_module";
import { S3Operations } from "@s3_module";
import getEnvVariable from "@/logic/getEnvVariable";

const handleSiteConfigPut = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<void> => {
    const body = JSON.parse(event.body || "{}");
    const item: SiteConfig = buildSiteConfig(body);
    const bucketName: string | undefined = getEnvVariable("BUCKET_NAME");
    const s3 = new S3Operations(bucketName);
    await s3.putJson("site-config", item);
};

export default handleSiteConfigPut;
