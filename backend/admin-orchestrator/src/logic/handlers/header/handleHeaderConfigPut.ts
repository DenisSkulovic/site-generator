import {S3Operations} from "@s3_module"
import { HeaderConfig, buildHeaderConfig } from "@page_cls_module"
import {type APIGatewayEvent} from "aws-lambda"

const handleHeaderConfigPut = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<void> => {
    const body = JSON.parse(event.body || "{}")
    const item: HeaderConfig = buildHeaderConfig(body)
    const bucketName: string | undefined = process.env.BUCKET_NAME
    if (!bucketName) throw new Error("BUCKET_NAME is a mandatory env param")
    const s3 = new S3Operations(bucketName)
    await s3.putJson("header-config", item)
}

export default handleHeaderConfigPut