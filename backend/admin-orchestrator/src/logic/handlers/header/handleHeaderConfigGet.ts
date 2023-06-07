import { HeaderConfig, buildHeaderConfig } from "@page_cls_module"
import {S3Operations} from "@s3_module"
import {type APIGatewayEvent} from "aws-lambda"

const handleHeaderConfigGet = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<HeaderConfig> => {
    const bucketName: string | undefined = process.env.BUCKET_NAME
    if (!bucketName) throw new Error("BUCKET_NAME is a mandatory env param")
    const s3 = new S3Operations(bucketName)
    const item = await s3.getJson("header-config")
    return buildHeaderConfig(item)
}

export default handleHeaderConfigGet