import { APIGatewayEvent } from "aws-lambda";
import { HeaderConfig, buildHeaderConfig } from "@page_cls_module";
import { S3Operations } from "@s3_module";
import getEnvVariable from "@/logic/getEnvVariable";

const handleHeaderConfigPut = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<void> => {
    const body = JSON.parse(event.body || "{}");
    const item: HeaderConfig = buildHeaderConfig(body);

    const bucketName = getEnvVariable("BUCKET_NAME");
    const s3 = new S3Operations(bucketName);
    await s3.putJson("header-config", item);
}

export default handleHeaderConfigPut;
